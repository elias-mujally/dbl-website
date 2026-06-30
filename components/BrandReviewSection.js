"use client";

import { useEffect, useState } from "react";
import { getReviewProduct } from "../lib/reviews";
import StarRating from "./StarRating";

export default function BrandReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/reviews?featured=1", { cache: "no-store" });
        const result = await response.json();
        if (active && response.ok) setReviews(result.reviews || []);
      } catch (error) {
        if (active) setReviews([]);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadReviews();

    return () => {
      active = false;
    };
  }, []);

  if (isLoading || !reviews.length) return null;

  return (
    <section className="page-section brand-review-section">
      <div className="section-heading reveal in-view">
        <span className="eyebrow" data-i18n="reviews.brandEyebrow">
          DBL users
        </span>
        <h2 data-i18n="reviews.brandSectionTitle">What DBL Users Say</h2>
      </div>
      <div className="review-grid">
        {reviews.map((review) => {
          const product = getReviewProduct(review.productId);
          return (
            <article className="review-card reveal in-view" key={review.id}>
              <div className="review-card-top">
                <StarRating rating={review.rating} />
                {product ? (
                  <span className="review-product-name" data-i18n={product.titleI18nKey}>
                    {product.title}
                  </span>
                ) : null}
              </div>
              <blockquote>{review.publicReview}</blockquote>
              <footer>
                <strong>{review.name}</strong>
                {review.country ? <span>{review.country}</span> : null}
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
