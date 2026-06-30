"use client";

import { useEffect, useMemo, useState } from "react";
import RewardCard from "./RewardCard";

function getNestedTranslation(translations, key, fallback) {
  const value = key.split(".").reduce((current, part) => (current && current[part] !== undefined ? current[part] : undefined), translations);
  return typeof value === "string" ? value : fallback;
}

export default function ReviewForm({ product }) {
  const [translations, setTranslations] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [reward, setReward] = useState(null);

  const t = useMemo(() => {
    return (key, fallback) => getNestedTranslation(translations, key, fallback);
  }, [translations]);

  useEffect(() => {
    let active = true;

    const loadTranslations = async () => {
      const lang = document.documentElement.lang === "en" ? "en" : "ar";
      try {
        const response = await fetch(`/i18n/${lang}.json`);
        const nextTranslations = await response.json();
        if (active) setTranslations(nextTranslations);
      } catch (translationError) {
        if (active) setTranslations({});
      }
    };

    loadTranslations();
    const observer = new MutationObserver(loadTranslations);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      productId: product.id,
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      country: formData.get("country")?.toString().trim(),
      role: formData.get("role")?.toString().trim(),
      source: formData.get("source")?.toString(),
      rating: Number(formData.get("rating")),
      reason: formData.get("reason")?.toString().trim(),
      likedMost: formData.get("likedMost")?.toString().trim(),
      improvement: formData.get("improvement")?.toString().trim(),
      worthPrice: formData.get("worthPrice")?.toString(),
      publicReview: formData.get("publicReview")?.toString().trim(),
      publishPermission: formData.get("publishPermission") === "on",
      futurePrograms: formData.get("futurePrograms") === "on",
    };

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit review.");
      }

      setReward(result.reward || null);
      setStatus("success");
      form.reset();
    } catch (submitError) {
      setError(submitError.message || "Unable to submit review.");
      setStatus("error");
    }
  };

  if (status === "success") {
    const localizedReward = reward
      ? {
          ...reward,
          productName: t(reward.productNameI18nKey, reward.productName),
        }
      : null;
    const rewardLabels = {
      reward: t("reviews.reward.eyebrow", "DBL Reward"),
      off: t("reviews.reward.off", "OFF"),
      code: t("reviews.reward.codeLabel", "Code:"),
      viewProduct: t("reviews.reward.viewProduct", "View Product"),
      openReward: t("reviews.reward.openReward", "Open Your Reward"),
      unlockedTitle: t("reviews.reward.unlockedTitle", "DBL Reward Unlocked"),
      copyCode: t("reviews.reward.copyCode", "Copy Code"),
      copied: t("reviews.reward.copied", "Copied!"),
      manualTitle: t("reviews.reward.manualTitle", "Thank you for your review."),
      manualBody: t("reviews.reward.manualBody", "Your DBL Reward will be sent manually."),
    };

    return (
      <section className="review-success" aria-live="polite">
        <div className="section-heading">
          <span className="eyebrow">{t("reviews.reward.eyebrow", "DBL Reward")}</span>
          <h1>{t("reviews.reward.thankTitle", "Thank you for helping us improve DBL.")}</h1>
          <p>
            {t(
              "reviews.reward.thankSubtitle",
              "Your review helps us build better products. As a thank-you, we prepared a DBL Reward for you.",
            )}
          </p>
        </div>
        <RewardCard reward={localizedReward} labels={rewardLabels} />
      </section>
    );
  }

  return (
    <form className="review-form page-panel reveal in-view" onSubmit={handleSubmit}>
      <div className="review-form-grid">
        <label>
          <span>{t("reviews.form.name", "Name")}</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label>
          <span>{t("reviews.form.email", "Email")}</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span>{t("reviews.form.country", "Country")}</span>
          <input name="country" type="text" autoComplete="country-name" />
        </label>
        <label>
          <span>{t("reviews.form.role", "Profession / role")}</span>
          <input name="role" type="text" />
        </label>
        <label>
          <span>{t("reviews.form.source", "How did you get this product?")}</span>
          <select name="source" defaultValue="purchased">
            <option value="purchased">{t("reviews.form.sources.purchased", "Purchased from Gumroad")}</option>
            <option value="early">{t("reviews.form.sources.early", "Early review copy")}</option>
          </select>
        </label>
        <fieldset className="rating-field">
          <legend>{t("reviews.form.rating", "Rating from 1 to 5 stars")}</legend>
          <div className="rating-options">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating}>
                <input name="rating" type="radio" value={rating} required />
                <span>{`${rating} \u2605`}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <label>
        <span>{t("reviews.form.reason", "What made you buy this product?")}</span>
        <textarea name="reason" rows="3" />
      </label>
      <label>
        <span>{t("reviews.form.likedMost", "What did you like the most?")}</span>
        <textarea name="likedMost" rows="3" />
      </label>
      <label>
        <span>{t("reviews.form.improvement", "What needs improvement?")}</span>
        <textarea name="improvement" rows="3" />
      </label>
      <label>
        <span>{t("reviews.form.worthPrice", "Do you think the product is worth its price?")}</span>
        <select name="worthPrice" defaultValue="fair">
          <option value="worth-more">{t("reviews.form.worthOptions.worthMore", "Yes, worth more than the price")}</option>
          <option value="fair">{t("reviews.form.worthOptions.fair", "Yes, price is fair")}</option>
          <option value="depends">{t("reviews.form.worthOptions.depends", "Maybe, depends on the user")}</option>
          <option value="high">{t("reviews.form.worthOptions.high", "No, price feels high")}</option>
        </select>
      </label>
      <label>
        <span>{t("reviews.form.publicReview", "Public review text")}</span>
        <textarea name="publicReview" rows="5" required />
      </label>

      <label className="checkbox-row">
        <input name="publishPermission" type="checkbox" required />
        <span>{t("reviews.form.publishPermission", "I allow DBL to publish my review on the website.")}</span>
      </label>
      <label className="checkbox-row">
        <input name="futurePrograms" type="checkbox" />
        <span>
          {t("reviews.form.futurePrograms", "I want to be considered for future DBL early review programs.")}
        </span>
      </label>

      {error ? <p className="form-error">{error}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? t("reviews.form.submitting", "Submitting...") : t("reviews.form.submit", "Submit Review")}
      </button>
    </form>
  );
}
