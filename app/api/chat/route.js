import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { createChatResponse, fallbackPayload, loadLocalEnv } = require("../../../assistant-gemini");

const chatRateBuckets = new Map();
const CHAT_RATE_LIMIT = 10;
const CHAT_RATE_WINDOW_MS = 5 * 60 * 1000;

export const runtime = "nodejs";

function jsonResponse(status, payload) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return "unknown";
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

export async function POST(request) {
  if (isRateLimited(getClientIp(request))) {
    return jsonResponse(429, {
      reply:
        "طھظ… ط¥ط±ط³ط§ظ„ ط¹ط¯ط¯ ظƒط¨ظٹط± ظ…ظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط®ظ„ط§ظ„ ظپطھط±ط© ظ‚طµظٹط±ط©. ط­ط§ظˆظ„ ظ…ط±ط© ط£ط®ط±ظ‰ ط¨ط¹ط¯ ط¯ظ‚ط§ط¦ظ‚ ظ‚ظ„ظٹظ„ط©.",
      intent: "rate_limited",
      buttons: [],
      memory_updates: {},
      error: "Rate limit exceeded",
    });
  }

  try {
    const rootDir = process.cwd();
    loadLocalEnv(rootDir);
    const body = await request.json().catch(() => ({}));
    const message = String(body.message || "").trim();
    const language = body.language === "en" ? "en" : "ar";

    if (!message) {
      return jsonResponse(400, { error: "Message is required" });
    }

    const result = await createChatResponse({
      rootDir,
      message,
      language,
      conversationHistory: body.conversationHistory || [],
      userMemory: body.userMemory || body.memory || {},
      currentPage: body.currentPage || "",
      pageTitle: body.pageTitle || "",
    });

    return jsonResponse(200, result);
  } catch (error) {
    console.error("DBL Chat Error", {
      hasKey: Boolean(process.env.GEMINI_API_KEY),
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
      status: error.statusCode || null,
      error: error.message,
    });

    return jsonResponse(200, {
      ...fallbackPayload(),
      error: error.publicMessage || "Assistant is temporarily unavailable.",
      debug_error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
}

export function GET() {
  return jsonResponse(405, { error: "Method not allowed" });
}

export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
export const OPTIONS = GET;
