"use client";

import { useEffect, useMemo, useState } from "react";
import StarRating from "./StarRating";

const filters = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "all" },
];

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatSource(source) {
  return source === "early_review_copy" ? "Early Reviewer" : "Verified Buyer";
}

function formatPriceValue(value) {
  const labels = {
    "worth-more": "Yes, worth more than the price",
    fair: "Yes, price is fair",
    depends: "Maybe, depends on the user",
    high: "No, price feels high",
  };
  return labels[value] || value || "Not provided";
}

export default function AdminReviewsDashboard({ initialKey = "" }) {
  const [adminKey, setAdminKey] = useState(initialKey);
  const [activeKey, setActiveKey] = useState(initialKey);
  const [status, setStatus] = useState("pending");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const hasAccess = Boolean(activeKey);

  const requestHeaders = useMemo(() => {
    return activeKey ? { "x-admin-review-key": activeKey } : {};
  }, [activeKey]);

  const loadReviews = async () => {
    if (!activeKey) return;
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/reviews?status=${status}`, {
        headers: requestHeaders,
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to load reviews.");
      }

      setReviews(result.reviews || []);
    } catch (loadError) {
      setReviews([]);
      setError(loadError.message || "Unable to load reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [activeKey, status]);

  const handleLogin = (event) => {
    event.preventDefault();
    setActiveKey(adminKey.trim());
  };

  const updateStatus = async (reviewId, nextStatus) => {
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          ...requestHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to update review.");
      }

      setMessage(`Review ${nextStatus}.`);
      await loadReviews();
    } catch (updateError) {
      setError(updateError.message || "Unable to update review.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasAccess) {
    return (
      <form className="admin-login-card page-panel reveal in-view" onSubmit={handleLogin}>
        <label>
          <span>Admin review key</span>
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="btn btn-primary" type="submit">
          Open Dashboard
        </button>
      </form>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-filter-row" role="tablist" aria-label="Review status filters">
        {filters.map((filter) => (
          <button
            className={`admin-filter-tab${status === filter.value ? " active" : ""}`}
            type="button"
            key={filter.value}
            onClick={() => setStatus(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {message ? <p className="admin-message success">{message}</p> : null}
      {error ? <p className="admin-message error">{error}</p> : null}
      {isLoading ? <p className="review-status-note">Loading reviews...</p> : null}

      {!isLoading && !reviews.length ? (
        <article className="review-empty-state">
          <p>No reviews found for this filter.</p>
        </article>
      ) : null}

      <div className="admin-review-grid">
        {reviews.map((review) => (
          <article className="admin-review-card page-panel" key={review.id}>
            <div className="admin-review-card-header">
              <div>
                <span className={`admin-status-badge ${review.status}`}>{review.status}</span>
                <h2>{review.productName}</h2>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <dl className="admin-review-details">
              <div>
                <dt>Reviewer</dt>
                <dd>{review.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{review.email}</dd>
              </div>
              <div>
                <dt>Country</dt>
                <dd>{review.country || "Not provided"}</dd>
              </div>
              <div>
                <dt>Profession</dt>
                <dd>{review.profession || "Not provided"}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{formatSource(review.source)}</dd>
              </div>
              <div>
                <dt>Price/value</dt>
                <dd>{formatPriceValue(review.priceValue)}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(review.createdAt)}</dd>
              </div>
            </dl>

            <div className="admin-review-text">
              <h3>Purchase reason</h3>
              <p>{review.purchaseReason || "Not provided"}</p>
              <h3>What they liked most</h3>
              <p>{review.likedMost || "Not provided"}</p>
              <h3>Needs improvement</h3>
              <p>{review.needsImprovement || "Not provided"}</p>
              <h3>Public review</h3>
              <blockquote>{review.publicReview}</blockquote>
            </div>

            {review.status === "pending" ? (
              <div className="admin-review-actions">
                <button className="btn btn-primary" type="button" onClick={() => updateStatus(review.id, "approved")}>
                  Approve
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => updateStatus(review.id, "rejected")}>
                  Reject
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
