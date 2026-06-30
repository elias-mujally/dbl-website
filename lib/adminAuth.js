export function verifyAdminReviewKey(request) {
  const expectedKey = process.env.ADMIN_REVIEW_KEY;
  if (!expectedKey) return false;

  const providedKey = request.headers.get("x-admin-review-key") || new URL(request.url).searchParams.get("key");
  return providedKey === expectedKey;
}
