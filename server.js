require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const { createChatResponse, fallbackPayload, loadLocalEnv, runChatDiagnostic } = require("./assistant-gemini");

const root = __dirname;
loadLocalEnv(root);

const port = process.env.PORT || 4173;
const chatRateBuckets = new Map();
const CHAT_RATE_LIMIT = 10;
const CHAT_RATE_WINDOW_MS = 5 * 60 * 1000;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".zip": "application/zip",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 18000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
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

async function handleChatRequest(req, res) {
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
    const body = await readJsonBody(req);
    const message = String(body.message || "").trim();
    const language = body.language === "en" ? "en" : "ar";

    if (!message) {
      sendJson(res, 400, { error: "Message is required" });
      return;
    }

    const result = await createChatResponse({
      rootDir: root,
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
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  if (urlPath === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (urlPath === "/api/chat-test") {
    if (process.env.NODE_ENV === "production") {
      sendJson(res, 404, { error: "Not found" });
      return;
    }
    runChatDiagnostic(root)
      .then((result) => sendJson(res, 200, result))
      .catch((error) => sendJson(res, 200, {
        ok: false,
        geminiStatus: null,
        geminiRawTextPreview: "",
        parsed: false,
        productsLoaded: false,
        error: error.message
      }));
    return;
  }

  if (urlPath === "/api/chat") {
    handleChatRequest(req, res);
    return;
  }

  const requestPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.resolve(root, `.${requestPath}`);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Digital Blueprint Lab preview running on http://127.0.0.1:${port}`);
});
