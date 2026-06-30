import { verifyAdminReviewKey } from "../../../../lib/adminAuth";
import { getReviews } from "../../../../lib/reviewStorage";

export async function GET(request) {
  if (!verifyAdminReviewKey(request)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";
  const productId = searchParams.get("productId") || undefined;
  const reviews = await getReviews({ status, productId });

  return Response.json({ reviews });
}
