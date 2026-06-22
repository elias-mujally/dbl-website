const fs = require("fs");
const path = require("path");
const { analyzeConversation } = require("../assistant-brain");

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function getProductKnowledge() {
  try {
    const filePath = path.join(process.cwd(), "assets", "dbl-guide", "products.json");
    const knowledge = fs.readFileSync(filePath, "utf8");
    JSON.parse(knowledge);
    return knowledge;
  } catch (error) {
    console.warn("DBL Guide product knowledge unavailable:", error.message);
    return "{}";
  }
}

function getProductKnowledgeData() {
  try {
    return JSON.parse(getProductKnowledge());
  } catch (error) {
    return { products: [] };
  }
}

async function getGeminiReply(message, language, brain) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return brain.draftReply;
  }

  const prompt = [
    "أنت DBL Guide، مساعد ذكي لموقع Digital Blueprint Lab. أنت لست chatbot مبيعات تقليدي. أنت مستشار رقمي ودود يساعد الزائر على فهم احتياجه واختيار المورد المناسب عند الحاجة. لا تبدأ بالبيع. افهم أولًا. اسأل سؤالًا واحدًا فقط إذا كانت المعلومات ناقصة. استخدم بيانات products.json كحقائق فقط، ولا تنسخ الوصف حرفيًا. لا ترشح منتجًا إلا إذا كان مناسبًا. اجعل الردود قصيرة، طبيعية، متنوعة، وواضحة. إذا كان السؤال لا يحتاج منتجًا، أجب بدون بيع. إذا رشحت منتجًا، اذكر السبب بجملة أو جملتين فقط.",
    "The Conversation Brain already decided the intent, action, product, memory, and draft reply. Do not change the decision or recommend a different product.",
    "Do not write raw product URLs. Buttons are handled by the website UI.",
    "Never promise guaranteed income, sales, or financial results.",
    `Current website language: ${language === "ar" ? "Arabic" : "English"}.`,
    `Brain intent: ${brain.intent}.`,
    `Brain action: ${brain.decision}.`,
    `Response goal: ${brain.responseGoal}.`,
    `Recommended product id chosen by brain: ${brain.product?.id || "none"}.`,
    `Current page product id: ${brain.pageProduct?.id || "none"}.`,
    `Relevant product facts selected by code: ${JSON.stringify(brain.relevantProductFacts || null)}.`,
    `Session memory: ${JSON.stringify(brain.memory || {})}.`,
    `Draft reply to rewrite naturally without changing meaning: ${brain.draftReply || ""}`,
    "Product knowledge JSON:",
    getProductKnowledge(),
    `Visitor message: ${message}`
  ].join("\n");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.45,
        maxOutputTokens: 220
      }
    })
  });

  if (!response.ok) {
    const error = new Error(`Gemini request failed with status ${response.status}`);
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!reply) {
    const error = new Error("Gemini returned an empty response");
    error.statusCode = 502;
    throw error;
  }

  return reply;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const message = String(body.message || "").trim();
    const language = body.language === "ar" ? "ar" : "en";

    if (!message) {
      sendJson(res, 400, { error: "Message is required" });
      return;
    }

    const knowledge = getProductKnowledgeData();
    const brain = analyzeConversation({
      message: message.slice(0, 1200),
      language,
      currentPage: body.currentPage,
      pageTitle: body.pageTitle,
      memory: body.memory,
      products: knowledge.products || []
    });
    const reply = await getGeminiReply(message.slice(0, 1200), language, brain);
    sendJson(res, 200, {
      reply,
      actions: brain.actions,
      memory: brain.memory,
      intent: brain.intent,
      decision: brain.decision
    });
  } catch (error) {
    console.error("DBL Guide chat error:", error.message);
    sendJson(res, error.statusCode || 500, { error: "Assistant is temporarily unavailable" });
  }
};
