"use client";

import { useEffect, useState } from "react";
import { getReviewProduct } from "../lib/reviews";
import StarRating from "./StarRating";

function reviewerMeta(review) {
  return [review.country, review.profession].filter(Boolean).join(" • ");
}

function useCurrentLanguage() {
  const [language, setLanguage] = useState("ar");

  useEffect(() => {
    const updateLanguage = () => setLanguage(document.documentElement.lang === "en" ? "en" : "ar");
    updateLanguage();

    const observer = new MutationObserver(updateLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    return () => observer.disconnect();
  }, []);

  return language;
}

function badgeLabel(source, language) {
  if (source === "purchased_from_gumroad") {
    return language === "ar" ? "مشتري موثّق" : "Verified Buyer";
  }

  return language === "ar" ? "مراجع مبكر" : "Early Reviewer";
}

function emptyStateLabel(language) {
  return language === "ar"
    ? "هذا المنتج يجمع مراجعاته الأولى حاليًا."
    : "This product is currently collecting its first reviews.";
}

export default function ReviewSection({ productId }) {
  const product = getReviewProduct(productId);
  const language = useCurrentLanguage();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ average: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/reviews?productId=${productId}`, { cache: "no-store" });
        const result = await response.json();
        if (active && response.ok) {
          setReviews(result.reviews || []);
          setSummary(result.summary || { average: 0, count: 0 });
        }
      } catch (error) {
        if (active) {
          setReviews([]);
          setSummary({ average: 0, count: 0 });
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    if (product) loadReviews();

    return () => {
      active = false;
    };
  }, [product, productId]);

  if (!product) return null;

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
                <span className="review-badge">{badgeLabel(review.source, language)}</span>
              </div>
              <blockquote>{review.publicReview}</blockquote>
              <footer>
                <strong>{review.name}</strong>
                {reviewerMeta(review) ? <span>{reviewerMeta(review)}</span> : null}
              </footer>
            </article>
          ))}
        </div>
      ) : !isLoading ? (
        <article className="review-empty-state">
          <p data-i18n="reviews.emptyState">{emptyStateLabel(language)}</p>
        </article>
      ) : null}
    </section>
  );
}
