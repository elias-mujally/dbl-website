const { createChatResponse, fallbackPayload, loadLocalEnv } = require("../assistant-gemini");

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
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
    console.error("DBL Guide chat error:", error.message);
    sendJson(res, error.statusCode || 500, {
      ...fallbackPayload(),
      error: error.publicMessage || "Assistant is temporarily unavailable."
    });
  }
};
