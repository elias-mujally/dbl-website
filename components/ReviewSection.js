import { getApprovedReviews, getReviewProduct, getReviewSummary } from "../lib/reviews";
import StarRating from "./StarRating";

function reviewerMeta(review) {
  return [review.country, review.role].filter(Boolean).join(" • ");
}

export default function ReviewSection({ productId }) {
  const product = getReviewProduct(productId);
  if (!product) return null;

  const reviews = getApprovedReviews(productId);
  const summary = getReviewSummary(productId);

  return (
    <section className="page-section review-section reveal in-view" aria-labelledby={`${productId}-reviews-title`}>
      <div className="section-heading">
        <span className="eyebrow" data-i18n="reviews.sectionEyebrow">
          Customer feedback
        </span>
        <h2 id={`${productId}-reviews-title`} data-i18n="reviews.productSectionTitle">
          What Early Reviewers Say
        </h2>
        {summary.count > 0 ? (
          <p className="review-summary">
            <StarRating rating={summary.average} />
            <strong>{summary.average.toFixed(1)}</strong>
            <span>•</span>
            <span>
              {summary.count} <span data-i18n="reviews.reviewCountLabel">reviews</span>
            </span>
          </p>
        ) : null}
      </div>

      {reviews.length ? (
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card-top">
                <StarRating rating={review.rating} />
                <span className="review-badge" data-i18n={`reviews.badges.${review.source === "purchased" ? "verified" : "early"}`}>
                  {review.source === "purchased" ? "Verified Buyer" : "Early Reviewer"}
                </span>
              </div>
              <blockquote>{review.publicReview}</blockquote>
              <footer>
                <strong>{review.name}</strong>
                {reviewerMeta(review) ? <span>{reviewerMeta(review)}</span> : null}
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <article className="review-empty-state">
          <p data-i18n="reviews.emptyState">This product is currently collecting its first reviews.</p>
          <a className="btn btn-secondary" href={`/review/${productId}`} data-i18n="reviews.writeReview">
            Write a Review
          </a>
        </article>
      )}
    </section>
  );
}
