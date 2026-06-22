const fs = require("fs");
const path = require("path");

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const FALLBACK_REPLY = "\u062a\u0639\u0630\u0631 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0627\u0644\u0645\u0633\u0627\u0639\u062f \u0627\u0644\u0622\u0646. \u062c\u0631\u0651\u0628 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0628\u0639\u062f \u0644\u062d\u0638\u0627\u062a.";
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

  fs.readFileSync(envPath, "utf8").split(/\r?\n/).forEach((line) => {
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

function logChat(label, value) {
  if (value === undefined) {
    console.log(`[DBL Guide] ${label}`);
    return;
  }
  console.log(`[DBL Guide] ${label}:`, value);
}

function readProductKnowledge(rootDir) {
  const candidates = [
    path.join(rootDir, "assets", "dbl-guide", "products.json"),
    path.join(rootDir, "dist", "assets", "dbl-guide", "products.json"),
    path.join(__dirname, "assets", "dbl-guide", "products.json"),
    path.join(__dirname, "dist", "assets", "dbl-guide", "products.json")
  ];
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) {
    throw new Error(`products.json not found. Checked: ${candidates.join(", ")}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  return { raw, data };
}

function safeString(value, max = 1200) {
  return String(value || "").trim().slice(0, max);
}

function productIds(products) {
  return new Set((products || []).map((product) => product.id).filter(Boolean));
}

function pageProductFromPath(currentPage, products) {
  const page = String(currentPage || "");
  return (products || []).find((product) => product.page_link && page.endsWith(product.page_link)) || null;
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
    "You are DBL Guide, the AI assistant for Digital Blueprint Lab.",
    "You are not a fixed if/else chatbot. You are a focused digital consultant for DBL products and DBL-adjacent digital work.",
    "",
    "Use products.json as factual knowledge only. Do not copy long descriptions verbatim.",
    "Understand the user's message, current page, memory, and conversation history.",
    "Do not recommend a product in every message.",
    "If the user asks a direct question such as price, contents, payment, or comparison, answer it directly.",
    "If information is missing, ask exactly one useful follow-up question.",
    "If the message is fully out of DBL scope, politely refuse without answering the outside topic. Vary the wording.",
    "Do not promise guaranteed revenue, sales, or financial results.",
    "Do not write long URLs inside reply text. Use buttons.",
    "If the user says explain it, how much is it, or is it good for me, use currentProduct or lastRecommendedProduct from memory.",
    "",
    "Scope:",
    "In scope: DBL products, prices, contents, comparisons, payment, product choice, digital work, digital products, freelancing, AI for marketing/content/freelancing/digital products.",
    "Out of scope: sports, news, medical advice, legal advice, cooking, cars, travel, unrelated personal questions, and general programming unrelated to DBL or the website.",
    "",
    "Return ONLY valid JSON. No markdown. No code fences. No explanation outside JSON.",
    "Required JSON shape:",
    JSON.stringify({
      reply: "natural answer for the user",
      intent: "greeting | product_question | price_question | product_details | comparison | payment | recommendation | near_scope_general | out_of_scope | unclear",
      is_out_of_scope: false,
      needs_more_info: false,
      recommended_product_id: null,
      current_product_id: null,
      confidence: 0,
      buttons: [{ label: "View Product", type: "product", url: "/dbl-prompt-vault.html" }],
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
    `Current website language: ${language === "ar" ? "Arabic" : "English"}. Reply in the user's language.`,
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

function cleanGeminiText(rawText) {
  return safeString(rawText, 2000)
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function safeParseGeminiJson(rawText) {
  const cleaned = cleanGeminiText(rawText);
  if (!cleaned) {
    return {
      ok: false,
      data: null,
      rawText: "",
      error: new Error("Gemini returned an empty text response")
    };
  }

  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  const jsonText = first !== -1 && last > first ? cleaned.slice(first, last + 1) : cleaned;

  try {
    return {
      ok: true,
      data: JSON.parse(jsonText),
      rawText: cleaned,
      error: null
    };
  } catch (error) {
    return {
      ok: false,
      data: null,
      rawText: cleaned,
      error
    };
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

function fallbackPayload(message = FALLBACK_REPLY, extra = {}) {
  return {
    reply: message || FALLBACK_REPLY,
    intent: "unclear",
    is_out_of_scope: false,
    needs_more_info: true,
    recommended_product_id: null,
    current_product_id: null,
    confidence: 0,
    buttons: [],
    memory_updates: {},
    ...extra
  };
}

function rawTextPayload(rawText) {
  return fallbackPayload(cleanGeminiText(rawText) || FALLBACK_REPLY, {
    parse_fallback: true
  });
}

async function callGeminiGenerate({ apiKey, model, prompt, useJsonMime }) {
  const selectedModel = model || GEMINI_MODEL;
  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 700
  };
  if (useJsonMime) generationConfig.responseMimeType = "application/json";

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      generationConfig
    })
  });
  const responseText = await response.text();
  return { response, responseText, model: selectedModel, useJsonMime };
}

function parseGeminiEnvelope(responseText) {
  const envelope = JSON.parse(responseText);
  return {
    envelope,
    rawText: extractTextFromGemini(envelope)
  };
}

function logChatError({ status, error }) {
  console.error("DBL Chat Error", {
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    model: GEMINI_MODEL,
    status,
    error: error?.message || String(error || "")
  });
}

function getGeminiModels() {
  return [
    process.env.GEMINI_MODEL,
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest"
  ].filter(Boolean).filter((model, index, models) => models.indexOf(model) === index);
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
  logChat("GEMINI_API_KEY present", Boolean(apiKey));
  if (!apiKey) {
    return fallbackPayload(FALLBACK_REPLY, {
      error: "Gemini API key is missing on the server.",
      server_error: true
    });
  }

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

  const prompt = `${systemPrompt}\n\nVisitor message:\n${safeMessage}`;
  let lastError = null;
  let lastStatus = null;

  for (const model of getGeminiModels()) {
    for (const useJsonMime of [true, false]) {
      try {
        const { response, responseText } = await callGeminiGenerate({ apiKey, model, prompt, useJsonMime });
      lastStatus = response.status;
      logChat("Gemini HTTP status", `${response.status} model=${model} jsonMime=${useJsonMime}`);

      if (!response.ok) {
        logChat("Gemini API error body", responseText.slice(0, 1200));
        lastError = new Error(`Gemini request failed with status ${response.status}`);
        continue;
      }

      let rawText = "";
      try {
        rawText = parseGeminiEnvelope(responseText).rawText;
      } catch (error) {
        logChat("Gemini envelope JSON.parse error", error.message);
        logChat("Gemini raw envelope", responseText.slice(0, 1200));
        return rawTextPayload(responseText);
      }

      logChat("Gemini raw text before JSON.parse", rawText || "(empty)");
      const parsed = safeParseGeminiJson(rawText);
      if (!parsed.ok) {
        logChat("Gemini structured JSON.parse error", parsed.error.message);
        return rawTextPayload(parsed.rawText);
      }

      return sanitizeGeminiPayload(parsed.data, productsData.products || [], currentPage);
      } catch (error) {
        lastError = error;
        logChatError({ status: lastStatus, error });
      }
    }
  }

  logChatError({ status: lastStatus, error: lastError || new Error("Gemini request failed") });
  return fallbackPayload(FALLBACK_REPLY, {
    debug_error: process.env.NODE_ENV === "production" ? undefined : safeString(lastError?.message || "Gemini request failed", 300),
    server_error: true
  });
}

async function runChatDiagnostic(rootDir) {
  const apiKey = process.env.GEMINI_API_KEY;
  const diagnostic = {
    ok: false,
    hasGeminiKey: Boolean(apiKey),
    model: GEMINI_MODEL,
    geminiStatus: null,
    geminiRawTextPreview: "",
    parsed: false,
    productsLoaded: false,
    error: null
  };

  try {
    readProductKnowledge(rootDir);
    diagnostic.productsLoaded = true;
  } catch (error) {
    diagnostic.error = `products.json failed: ${error.message}`;
    return diagnostic;
  }

  if (!apiKey) {
    diagnostic.error = "Gemini API key is missing on the server.";
    return diagnostic;
  }

  const prompt = [
    "Return ONLY valid JSON. No markdown.",
    "Use this exact shape:",
    JSON.stringify({ reply: "hello from DBL Guide" }),
    "Message: قل مرحبًا من DBL Guide"
  ].join("\n");

  let lastError = null;
  for (const useJsonMime of [true, false]) {
    try {
      const { response, responseText } = await callGeminiGenerate({ apiKey, prompt, useJsonMime });
      diagnostic.geminiStatus = response.status;

      if (!response.ok) {
        diagnostic.geminiRawTextPreview = responseText.slice(0, 500);
        lastError = new Error(`Gemini request failed with status ${response.status}`);
        continue;
      }

      const { rawText } = parseGeminiEnvelope(responseText);
      diagnostic.geminiRawTextPreview = safeString(rawText || responseText, 500);
      const parsed = safeParseGeminiJson(rawText);
      diagnostic.parsed = parsed.ok;
      diagnostic.ok = parsed.ok;
      diagnostic.error = parsed.ok ? null : parsed.error.message;
      return diagnostic;
    } catch (error) {
      lastError = error;
      diagnostic.error = error.message;
      logChatError({ status: diagnostic.geminiStatus, error });
    }
  }

  diagnostic.error = lastError?.message || diagnostic.error || "Gemini diagnostic failed";
  return diagnostic;
}

module.exports = {
  createChatResponse,
  fallbackPayload,
  loadLocalEnv,
  runChatDiagnostic,
  safeParseGeminiJson
};
