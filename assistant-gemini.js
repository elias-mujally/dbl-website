const fs = require("fs");
const path = require("path");

const GEMINI_MODEL = "gemini-1.5-flash";
const FALLBACK_REPLY = "حدث خلل بسيط في الرد. جرّب إعادة صياغة سؤالك.";
const ALLOWED_INTENTS = new Set([
  "greeting",
  "product_question",
  "price_question",
  "product_details",
  "comparison",
  "payment",
  "recommendation",
  "near_scope_general",
  "out_of_scope",
  "unclear"
]);
const ALLOWED_BUTTON_TYPES = new Set(["product", "payment", "compare", "question", "link"]);
const MEMORY_KEYS = [
  "userGoal",
  "userOccupation",
  "userExperienceLevel",
  "userBudget",
  "mainProblem",
  "currentProduct",
  "lastRecommendedProduct"
];

function loadLocalEnv(rootDir) {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separator = trimmed.indexOf("=");
    if (separator < 1) return;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  });
}

function readProductKnowledge(rootDir) {
  const filePath = path.join(rootDir, "assets", "dbl-guide", "products.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  return { raw, data };
}

function productIds(products) {
  return new Set((products || []).map((product) => product.id).filter(Boolean));
}

function pageProductFromPath(currentPage, products) {
  const page = String(currentPage || "");
  return (products || []).find((product) => product.page_link && page.endsWith(product.page_link)) || null;
}

function safeString(value, max = 1200) {
  return String(value || "").trim().slice(0, max);
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-10).map((item) => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: safeString(item?.content || item?.text || "", 900)
  })).filter((item) => item.content);
}

function sanitizeMemory(memory) {
  const output = {};
  if (!memory || typeof memory !== "object") return output;
  MEMORY_KEYS.concat(["conversationStage", "lastIntent", "currentPage"]).forEach((key) => {
    if (memory[key] !== undefined && memory[key] !== null && memory[key] !== "") {
      output[key] = safeString(memory[key], 240);
    }
  });
  return output;
}

function buildSystemPrompt({ language, productsRaw, currentPage, pageTitle, userMemory, conversationHistory }) {
  return [
    "أنت DBL Guide، مساعد ذكي لموقع Digital Blueprint Lab.",
    "أنت لست Chatbot بردود ثابتة، بل مستشار رقمي متخصص في منتجات DBL والعمل الرقمي ضمن نطاق DBL.",
    "",
    "مهمتك:",
    "- فهم رسالة المستخدم وسياق المحادثة.",
    "- استخدام ذاكرة المستخدم والصفحة الحالية.",
    "- استخدام products.json كمصدر حقائق فقط.",
    "- الإجابة بطريقة طبيعية وغير مكررة.",
    "- عدم نسخ وصف المنتجات حرفيًا.",
    "- عدم ترشيح منتج في كل رسالة.",
    "- إذا كان السؤال واضحًا مثل السعر أو المحتويات، أجب مباشرة.",
    "- إذا كانت المعلومات ناقصة، اسأل سؤالًا واحدًا فقط.",
    "- إذا كان السؤال خارج نطاق DBL تمامًا، اعتذر بلطف بصياغة متنوعة، ولا تجب على السؤال نفسه.",
    "- لا تستخدم نفس رسالة الاعتذار حرفيًا كل مرة.",
    "- لا تعد بأرباح أو نتائج مالية مضمونة.",
    "- لا تكتب روابط طويلة داخل الرد، استخدم buttons.",
    "- اجعل الردود واضحة، إنسانية، ومناسبة للسياق.",
    "- إذا كان السؤال قريبًا من نطاق DBL مثل العمل الرقمي أو AI أو الفريلانس، أجب باختصار ثم اربط بـ DBL فقط إذا كان مناسبًا.",
    "- إذا قال المستخدم \"اشرحه\" أو \"كم سعره\" أو \"هل يناسبني\"، استخدم currentProduct أو lastRecommendedProduct من الذاكرة.",
    "",
    "قواعد النطاق:",
    "داخل النطاق: منتجات DBL، الأسعار، المحتويات، المقارنات، طرق الدفع، اختيار المنتج المناسب، العمل الرقمي، المنتجات الرقمية، الفريلانس، واستخدام AI في التسويق أو المحتوى أو العمل الحر أو بناء المنتجات الرقمية.",
    "خارج النطاق تمامًا: الرياضة، الأخبار، الطب، القانون، الطبخ، السيارات، السفر، الأسئلة الشخصية غير المتعلقة بـ DBL، والبرمجة العامة غير المتعلقة بالموقع أو DBL.",
    "",
    "عند out_of_scope:",
    "- لا تجب على الموضوع نفسه.",
    "- اعتذر بلطف.",
    "- وضح أنك متخصص في DBL والعمل الرقمي.",
    "- غيّر الصياغة كل مرة.",
    "- لا تجعل الرد طويلًا.",
    "",
    "قواعد الردود:",
    "- لا تكرر نفس الجملة مرتين في محادثة واحدة.",
    "- اجعل كل رد مناسبًا لما قاله المستخدم.",
    "- لا تبدأ دائمًا بـ \"بناءً على كلامك\".",
    "- لا تبدأ دائمًا بـ \"أعتذر\".",
    "- لا تستخدم لغة تسويقية مبالغ فيها.",
    "- لا تكن مبهمًا عند شرح المنتجات.",
    "- عند شرح منتج، اذكر ما هو، ماذا يحتوي، لمن يناسب، ولماذا قد يفيد المستخدم بشكل مختصر ومنظم.",
    "",
    "يجب أن تعيد JSON صالحًا فقط، بدون Markdown وبدون شرح خارج JSON، بهذا الشكل:",
    JSON.stringify({
      reply: "نص الرد الطبيعي للمستخدم",
      intent: "greeting | product_question | price_question | product_details | comparison | payment | recommendation | near_scope_general | out_of_scope | unclear",
      is_out_of_scope: false,
      needs_more_info: false,
      recommended_product_id: null,
      current_product_id: null,
      confidence: 0,
      buttons: [{ label: "عرض المنتج", type: "product", url: "/dbl-prompt-vault.html" }],
      memory_updates: {
        userGoal: null,
        userOccupation: null,
        userExperienceLevel: null,
        userBudget: null,
        mainProblem: null,
        currentProduct: null,
        lastRecommendedProduct: null
      }
    }, null, 2),
    "",
    `Current website language: ${language === "ar" ? "Arabic" : "English"}. Reply in the same language unless the user clearly writes another language.`,
    `Current page path: ${currentPage || "/"}`,
    `Current page title: ${pageTitle || ""}`,
    `User memory JSON: ${JSON.stringify(userMemory)}`,
    `Recent conversation JSON: ${JSON.stringify(conversationHistory)}`,
    "",
    "products.json:",
    productsRaw
  ].join("\n");
}

function extractTextFromGemini(data) {
  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim() || "";
}

function parseStructuredOutput(text) {
  const cleaned = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");
    if (first !== -1 && last > first) {
      return JSON.parse(cleaned.slice(first, last + 1));
    }
    throw error;
  }
}

function isSafeButtonUrl(url) {
  if (!url) return false;
  if (url.startsWith("/") && !url.startsWith("//")) return true;
  if (url.startsWith("https://dblab.gumroad.com/")) return true;
  return false;
}

function sanitizeButtons(buttons) {
  if (!Array.isArray(buttons)) return [];
  return buttons.slice(0, 4).map((button) => {
    const label = safeString(button?.label, 80);
    if (!label) return null;
    const type = ALLOWED_BUTTON_TYPES.has(button?.type) ? button.type : "link";
    const output = { label, type };
    const url = safeString(button?.url || button?.href, 300);
    const value = safeString(button?.value, 200);
    if (isSafeButtonUrl(url)) output.url = url;
    if (!output.url && value) output.value = value;
    return output.url || output.value ? output : null;
  }).filter(Boolean);
}

function sanitizeMemoryUpdates(memoryUpdates, ids) {
  const output = {};
  if (!memoryUpdates || typeof memoryUpdates !== "object") return output;
  MEMORY_KEYS.forEach((key) => {
    const value = memoryUpdates[key];
    if (value === undefined) return;
    if (value === null || value === "") {
      output[key] = null;
      return;
    }
    const safe = safeString(value, 240);
    if ((key === "currentProduct" || key === "lastRecommendedProduct") && !ids.has(safe)) return;
    output[key] = safe;
  });
  return output;
}

function fallbackPayload() {
  return {
    reply: FALLBACK_REPLY,
    intent: "unclear",
    is_out_of_scope: false,
    needs_more_info: true,
    recommended_product_id: null,
    current_product_id: null,
    confidence: 0,
    buttons: [],
    memory_updates: {}
  };
}

function sanitizeGeminiPayload(payload, products, currentPage) {
  const ids = productIds(products);
  const pageProduct = pageProductFromPath(currentPage, products);
  const reply = safeString(payload?.reply, 2000);
  if (!reply) return fallbackPayload();

  const recommended = safeString(payload?.recommended_product_id, 120);
  const current = safeString(payload?.current_product_id, 120) || pageProduct?.id || null;
  const confidence = Number(payload?.confidence);
  const intent = ALLOWED_INTENTS.has(payload?.intent) ? payload.intent : "unclear";

  return {
    reply,
    intent,
    is_out_of_scope: Boolean(payload?.is_out_of_scope || intent === "out_of_scope"),
    needs_more_info: Boolean(payload?.needs_more_info),
    recommended_product_id: ids.has(recommended) ? recommended : null,
    current_product_id: ids.has(current) ? current : null,
    confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0,
    buttons: sanitizeButtons(payload?.buttons),
    memory_updates: sanitizeMemoryUpdates(payload?.memory_updates, ids)
  };
}

async function createChatResponse({
  rootDir,
  message,
  language = "ar",
  conversationHistory = [],
  userMemory = {},
  currentPage = "",
  pageTitle = ""
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallbackPayload();

  const { raw: productsRaw, data: productsData } = readProductKnowledge(rootDir);
  const safeMessage = safeString(message, 1200);
  const safeHistory = sanitizeHistory(conversationHistory);
  const safeMemory = sanitizeMemory(userMemory);
  const systemPrompt = buildSystemPrompt({
    language,
    productsRaw,
    currentPage: safeString(currentPage, 300),
    pageTitle: safeString(pageTitle, 300),
    userMemory: safeMemory,
    conversationHistory: safeHistory
  });

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }]
      },
      contents: [{
        role: "user",
        parts: [{ text: safeMessage }]
      }],
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 700,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`);
  }

  const data = await response.json();
  const text = extractTextFromGemini(data);
  const parsed = parseStructuredOutput(text);
  return sanitizeGeminiPayload(parsed, productsData.products || [], currentPage);
}

module.exports = {
  createChatResponse,
  fallbackPayload,
  loadLocalEnv
};
