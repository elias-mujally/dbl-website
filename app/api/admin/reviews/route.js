import { verifyAdminReviewKey } from "../../../../lib/adminAuth";
import { getReviews, isSupabaseReviewStorageConfiguredError } from "../../../../lib/reviewStorage";

export async function GET(request) {
  if (!verifyAdminReviewKey(request)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";
  const productId = searchParams.get("productId") || undefined;

  try {
    const reviews = await getReviews({ status, productId });
    return Response.json({ reviews });
  } catch (error) {
    if (isSupabaseReviewStorageConfiguredError(error)) {
      return Response.json({ error: "Supabase review storage is not configured." }, { status: 500 });
    }

    console.error("Failed to load admin reviews", {
      status,
      productId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return Response.json({ error: "Failed to load reviews." }, { status: 500 });
  }
}
