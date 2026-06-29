const { createChatResponse, fallbackPayload, loadLocalEnv } = require("../assistant-gemini");

const chatRateBuckets = new Map();
const CHAT_RATE_LIMIT = 10;
const CHAT_RATE_WINDOW_MS = 5 * 60 * 1000;

/*
POST /api/chat
{
  "message": "أهلا",
  "language": "ar",
  "conversationHistory": [],
  "userMemory": {},
  "currentPage": "/",
  "pageTitle": "Digital Blueprint Lab"
}
*/

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = chatRateBuckets.get(ip) || { count: 0, resetAt: now + CHAT_RATE_WINDOW_MS };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + CHAT_RATE_WINDOW_MS;
  }
  bucket.count += 1;
  chatRateBuckets.set(ip, bucket);
  return bucket.count > CHAT_RATE_LIMIT;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (isRateLimited(getClientIp(req))) {
    sendJson(res, 429, {
      reply: "تم إرسال عدد كبير من الرسائل خلال فترة قصيرة. حاول مرة أخرى بعد دقائق قليلة.",
      intent: "rate_limited",
      buttons: [],
      memory_updates: {},
      error: "Rate limit exceeded"
    });
    return;
  }

  try {
    const rootDir = process.cwd();
    loadLocalEnv(rootDir);
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const message = String(body.message || "").trim();
    const language = body.language === "en" ? "en" : "ar";

    if (!message) {
      sendJson(res, 400, { error: "Message is required" });
      return;
    }

    const result = await createChatResponse({
      rootDir,
      message,
      language,
      conversationHistory: body.conversationHistory || [],
      userMemory: body.userMemory || body.memory || {},
      currentPage: body.currentPage || "",
      pageTitle: body.pageTitle || ""
    });

    sendJson(res, 200, result);
  } catch (error) {
    console.error("DBL Chat Error", {
      hasKey: Boolean(process.env.GEMINI_API_KEY),
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
      status: error.statusCode || null,
      error: error.message
    });
    sendJson(res, 200, {
      ...fallbackPayload(),
      error: error.publicMessage || "Assistant is temporarily unavailable.",
      debug_error: process.env.NODE_ENV === "production" ? undefined : error.message
    });
  }
};
