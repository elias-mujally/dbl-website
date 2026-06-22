const fs = require("fs");
const path = require("path");

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

async function getGeminiReply(message, language, context = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const error = new Error("GEMINI_API_KEY is not configured");
    error.statusCode = 503;
    throw error;
  }

  const prompt = [
    "You are DBL Guide, the helpful assistant for Digital Blueprint Lab.",
    "The website code decides the conversation stage and recommended product. You only rewrite the provided draft reply naturally.",
    "Do not choose a different product. Do not add product links as raw text. Do not add full product descriptions unless the stage is product_details.",
    "Keep replies short, practical, friendly, and focused on DBL.",
    "If the user asks in Arabic, reply in natural Arabic. If they ask in English, reply in English.",
    "Use the product knowledge JSON below as the source of truth for products, prices, links, recommendation rules, and assistant behavior.",
    "Do not invent products, prices, discounts, guarantees, or payment links that are not in the product knowledge.",
    "Never promise guaranteed income, sales, or financial results.",
    `Current website language: ${language === "ar" ? "Arabic" : "English"}.`,
    `Conversation stage: ${context.stage || "diagnosis"}.`,
    `Recommended product id chosen by code: ${context.recommendedProductId || "none"}.`,
    `Session memory: ${JSON.stringify(context.memory || {})}.`,
    `Draft reply to rewrite without changing its meaning: ${context.draftReply || ""}`,
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
    const context = {
      stage: body.stage,
      draftReply: body.draftReply,
      recommendedProductId: body.recommendedProductId,
      memory: body.memory
    };

    if (!message) {
      sendJson(res, 400, { error: "Message is required" });
      return;
    }

    const reply = await getGeminiReply(message.slice(0, 1200), language, context);
    sendJson(res, 200, { reply });
  } catch (error) {
    console.error("DBL Guide chat error:", error.message);
    sendJson(res, error.statusCode || 500, { error: "Assistant is temporarily unavailable" });
  }
};
