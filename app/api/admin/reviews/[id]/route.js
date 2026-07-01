import { verifyAdminReviewKey } from "../../../../../lib/adminAuth";
import { isSupabaseReviewStorageConfiguredError, updateReviewStatus } from "../../../../../lib/reviewStorage";

export async function PATCH(request, { params }) {
  if (!verifyAdminReviewKey(request)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!["approved", "rejected"].includes(payload.status)) {
    return Response.json({ error: "Status must be approved or rejected." }, { status: 400 });
  }

  try {
    const review = await updateReviewStatus(id, payload.status);
    if (!review) return Response.json({ error: "Review not found." }, { status: 404 });
    return Response.json({ review });
  } catch (error) {
    if (isSupabaseReviewStorageConfiguredError(error)) {
      return Response.json({ error: "Supabase review storage is not configured." }, { status: 500 });
    }

    console.error("Failed to update review status", {
      id,
      status: payload.status,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return Response.json({ error: error.message || "Unable to update review." }, { status: 400 });
  }
}
