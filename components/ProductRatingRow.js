"use client";

import { useEffect, useState } from "react";

export default function ProductRatingRow({ productId }) {
  const [summary, setSummary] = useState({ average: 0, count: 0 });

  useEffect(() => {
    let active = true;

    const loadSummary = async () => {
      try {
        const response = await fetch(`/api/reviews?productId=${productId}`, { cache: "no-store" });
        const result = await response.json();
        if (active && response.ok) setSummary(result.summary || { average: 0, count: 0 });
      } catch (error) {
        if (active) setSummary({ average: 0, count: 0 });
      }
    };

    if (productId) loadSummary();

    return () => {
      active = false;
    };
  }, [productId]);

  if (!summary.count) return null;

  return (
    <p className="product-rating-row">
      <span aria-hidden="true">★</span> {summary.average.toFixed(1)} • {summary.count}{" "}
      <span data-i18n="reviews.reviewCountLabel">reviews</span>
    </p>
  );
}
