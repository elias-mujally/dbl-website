import { randomUUID } from "crypto";
import { getReviewProduct } from "./reviews";

const reviewStatuses = new Set(["pending", "approved", "rejected"]);
const missingSupabaseConfigMessage = "Supabase review storage is not configured.";

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(missingSupabaseConfigMessage);
  }

  return {
    baseUrl: `${supabaseUrl.replace(/\/$/, "")}/rest/v1/reviews`,
    serviceRoleKey,
  };
}

function supabaseHeaders(extraHeaders = {}) {
  const { serviceRoleKey } = getSupabaseConfig();

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };
}

async function readSupabaseResponse(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

async function supabaseRequest(url, options = {}) {
  const response = await fetch(url, options);
  const body = await readSupabaseResponse(response);

  if (!response.ok) {
    const detail = typeof body === "string" ? body : body?.message || body?.error || JSON.stringify(body);
    throw new Error(`Supabase review storage request failed (${response.status}): ${detail || response.statusText}`);
  }

  return body;
}

function normalizeSource(source) {
  if (source === "early" || source === "early_review_copy") return "early_review_copy";
  return "purchased_from_gumroad";
}

function normalizeReview(reviewData) {
  const product = getReviewProduct(reviewData.productId);
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    productId: reviewData.productId,
    productName: product?.title || reviewData.productName || reviewData.productId,
    name: reviewData.name || "",
    email: reviewData.email || "",
    country: reviewData.country || "",
    profession: reviewData.profession || reviewData.role || "",
    source: normalizeSource(reviewData.source),
    rating: Number(reviewData.rating),
    purchaseReason: reviewData.purchaseReason || reviewData.reason || "",
    likedMost: reviewData.likedMost || "",
    needsImprovement: reviewData.needsImprovement || reviewData.improvement || "",
    priceValue: reviewData.priceValue || reviewData.worthPrice || "",
    publicReview: reviewData.publicReview || "",
    allowPublish: reviewData.allowPublish ?? reviewData.publishPermission === true,
    futureReviewProgram: reviewData.futureReviewProgram ?? reviewData.futurePrograms === true,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
}

function toPublicReview(review) {
  return {
    id: review.id,
    productId: review.productId,
    productName: review.productName,
    name: review.name,
    country: review.country,
    profession: review.profession,
    source: review.source,
    rating: review.rating,
    publicReview: review.publicReview,
    createdAt: review.createdAt,
  };
}

function buildReviewsUrl({ status, productId, limit } = {}) {
  const { baseUrl } = getSupabaseConfig();
  const params = new URLSearchParams();

  params.set("select", "*");
  params.set("order", "createdAt.desc");
  if (status && status !== "all") params.set("status", `eq.${status}`);
  if (productId) params.set("productId", `eq.${productId}`);
  if (limit) params.set("limit", String(limit));

  return `${baseUrl}?${params.toString()}`;
}

export function isSupabaseReviewStorageConfiguredError(error) {
  return error instanceof Error && error.message === missingSupabaseConfigMessage;
}

export async function createReview(reviewData) {
  const { baseUrl } = getSupabaseConfig();
  const review = normalizeReview(reviewData);
  const body = await supabaseRequest(baseUrl, {
    method: "POST",
    headers: supabaseHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(review),
  });

  return Array.isArray(body) ? body[0] : review;
}

export async function getReviews({ status, productId } = {}) {
  return await supabaseRequest(buildReviewsUrl({ status, productId }), {
    method: "GET",
    headers: supabaseHeaders(),
  });
}

export async function updateReviewStatus(reviewId, status) {
  if (!reviewStatuses.has(status) || status === "pending") {
    throw new Error("Invalid review status.");
  }

  const { baseUrl } = getSupabaseConfig();
  const now = new Date().toISOString();
  const params = new URLSearchParams();
  params.set("id", `eq.${reviewId}`);

  const body = await supabaseRequest(`${baseUrl}?${params.toString()}`, {
    method: "PATCH",
    headers: supabaseHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify({ status, updatedAt: now }),
  });

  return Array.isArray(body) ? body[0] || null : null;
}

export async function getApprovedReviews(productId) {
  const reviews = await getReviews({ status: "approved", productId });
  return reviews.map(toPublicReview);
}

export async function getReviewSummary(productId) {
  const reviews = await getApprovedReviews(productId);
  if (!reviews.length) return { average: 0, count: 0 };
  const average = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length;
  return { average: Math.round(average * 10) / 10, count: reviews.length };
}

export async function getFeaturedApprovedReviews(limit = 3) {
  const reviews = await supabaseRequest(buildReviewsUrl({ status: "approved", limit }), {
    method: "GET",
    headers: supabaseHeaders(),
  });
  return reviews.map(toPublicReview);
}

export function getPublicReviewPayload(reviews) {
  const publicReviews = reviews.map(toPublicReview);
  const average = publicReviews.length
    ? publicReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / publicReviews.length
    : 0;

  return {
    reviews: publicReviews,
    summary: {
      average: Math.round(average * 10) / 10,
      count: publicReviews.length,
    },
  };
}
