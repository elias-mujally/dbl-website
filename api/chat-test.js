const { loadLocalEnv, runChatDiagnostic } = require("../assistant-gemini");

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const rootDir = process.cwd();
  loadLocalEnv(rootDir);
  const result = await runChatDiagnostic(rootDir);
  sendJson(res, 200, result);
};
