import { getReviewProduct, selectRewardForProduct } from "../../../lib/reviews";
import { createReview, getApprovedReviews, getFeaturedApprovedReviews, getPublicReviewPayload } from "../../../lib/reviewStorage";

const requiredStringFields = ["name", "email", "publicReview"];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateReviewPayload(payload) {
  if (!payload || typeof payload !== "object") return "Invalid review payload.";
  if (!getReviewProduct(payload.productId)) return "Unknown product.";

  for (const field of requiredStringFields) {
    if (!payload[field] || typeof payload[field] !== "string" || !payload[field].trim()) {
      return `${field} is required.`;
    }
  }

  if (!isValidEmail(payload.email)) return "A valid email is required.";
  if (!Number.isInteger(payload.rating) || payload.rating < 1 || payload.rating > 5) return "Rating is required.";
  if (payload.publishPermission !== true) return "Publishing permission is required.";

  return null;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validationError = validateReviewPayload(payload);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const submission = await createReview({
    productId: payload.productId,
    name: payload.name.trim(),
    email: payload.email.trim(),
    country: payload.country?.trim() || "",
    profession: payload.role?.trim() || "",
    source: payload.source === "early" ? "early" : "purchased",
    rating: payload.rating,
    purchaseReason: payload.reason?.trim() || "",
    likedMost: payload.likedMost?.trim() || "",
    needsImprovement: payload.improvement?.trim() || "",
    priceValue: payload.worthPrice || "",
    publicReview: payload.publicReview.trim(),
    allowPublish: true,
    futureReviewProgram: payload.futurePrograms === true,
  });
  const reward = selectRewardForProduct(payload.productId);

  return Response.json({
    status: submission.status,
    submissionId: submission.id,
    reward,
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const featured = searchParams.get("featured") === "1";

  if (productId && !getReviewProduct(productId)) {
    return Response.json({ error: "Unknown product." }, { status: 404 });
  }

  const reviews = featured ? await getFeaturedApprovedReviews(3) : await getApprovedReviews(productId || undefined);
  return Response.json(getPublicReviewPayload(reviews));
}
