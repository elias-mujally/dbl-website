import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { loadLocalEnv, runChatDiagnostic } = require("../../../assistant-gemini");

export const runtime = "nodejs";

function jsonResponse(status, payload) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function handler() {
  if (process.env.NODE_ENV === "production") {
    return jsonResponse(404, { error: "Not found" });
  }

  const rootDir = process.cwd();
  loadLocalEnv(rootDir);
  const result = await runChatDiagnostic(rootDir);
  return jsonResponse(200, result);
}

export async function GET() {
  return handler();
}

function methodNotAllowed() {
  if (process.env.NODE_ENV === "production") {
    return jsonResponse(404, { error: "Not found" });
  }

  return jsonResponse(405, { error: "Method not allowed" });
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
