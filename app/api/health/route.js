export const runtime = "nodejs";

function jsonResponse(status, payload) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export function GET() {
  return jsonResponse(200, { ok: true });
}

function methodNotAllowed() {
  return jsonResponse(405, { error: "Method not allowed" });
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
