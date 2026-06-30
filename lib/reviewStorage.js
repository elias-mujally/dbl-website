import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getReviewProduct } from "./reviews";

const storageFile = process.env.REVIEW_STORAGE_FILE || path.join(process.cwd(), "data", "reviews.json");
const reviewStatuses = new Set(["pending", "approved", "rejected"]);

async function ensureStorageFile() {
  await fs.mkdir(path.dirname(storageFile), { recursive: true });

  try {
    await fs.access(storageFile);
  } catch (error) {
    await fs.writeFile(storageFile, "[]\n", "utf8");
  }
}

async function readReviewsFile() {
  await ensureStorageFile();
  const file = await fs.readFile(storageFile, "utf8");
  const reviews = JSON.parse(file || "[]");
  return Array.isArray(reviews) ? reviews : [];
}

async function writeReviewsFile(reviews) {
  await ensureStorageFile();
  await fs.writeFile(storageFile, `${JSON.stringify(reviews, null, 2)}\n`, "utf8");
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

function sortNewestFirst(reviews) {
  return [...reviews].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function createReview(reviewData) {
  const reviews = await readReviewsFile();
  const review = normalizeReview(reviewData);
  reviews.push(review);
  await writeReviewsFile(reviews);
  return review;
}

export async function getReviews({ status, productId } = {}) {
  const reviews = await readReviewsFile();
  return sortNewestFirst(
    reviews.filter((review) => {
      if (status && status !== "all" && review.status !== status) return false;
      if (productId && review.productId !== productId) return false;
      return true;
    }),
  );
}

export async function updateReviewStatus(reviewId, status) {
  if (!reviewStatuses.has(status) || status === "pending") {
    throw new Error("Invalid review status.");
  }

  const reviews = await readReviewsFile();
  const reviewIndex = reviews.findIndex((review) => review.id === reviewId);
  if (reviewIndex === -1) return null;

  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    status,
    updatedAt: new Date().toISOString(),
  };
  await writeReviewsFile(reviews);
  return reviews[reviewIndex];
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
  const reviews = await getReviews({ status: "approved" });
  return reviews.slice(0, limit).map(toPublicReview);
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
