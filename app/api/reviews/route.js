import { getReviewProduct, selectRewardForProduct } from "../../../lib/reviews";
import {
  createReview,
  getApprovedReviews,
  getFeaturedApprovedReviews,
  getPublicReviewPayload,
  isSupabaseReviewStorageConfiguredError,
} from "../../../lib/reviewStorage";

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
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const validationError = validateReviewPayload(payload);
  if (validationError) {
    return Response.json({ ok: false, error: validationError }, { status: 400 });
  }

  try {
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
      ok: true,
      status: submission.status,
      reviewId: submission.id,
      submissionId: submission.id,
      reward,
    });
  } catch (error) {
    if (isSupabaseReviewStorageConfiguredError(error)) {
      return Response.json({ ok: false, error: "Supabase review storage is not configured." }, { status: 500 });
    }

    console.error("Failed to save review", {
      productId: payload.productId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return Response.json({ ok: false, error: "Failed to save review" }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const featured = searchParams.get("featured") === "1";

  if (productId && !getReviewProduct(productId)) {
    return Response.json({ error: "Unknown product." }, { status: 404 });
  }

  try {
    const reviews = featured ? await getFeaturedApprovedReviews(3) : await getApprovedReviews(productId || undefined);
    return Response.json({ ok: true, ...getPublicReviewPayload(reviews) });
  } catch (error) {
    if (isSupabaseReviewStorageConfiguredError(error)) {
      return Response.json(
        { ok: false, error: "Supabase review storage is not configured.", reviews: [], summary: { average: 0, count: 0 } },
        { status: 500 },
      );
    }

    console.error("Failed to load public reviews", {
      productId,
      featured,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return Response.json({ ok: false, error: "Failed to load reviews", reviews: [], summary: { average: 0, count: 0 } }, { status: 500 });
  }
}
