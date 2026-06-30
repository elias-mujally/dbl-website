"use client";

import { useState } from "react";

export default function RewardCard({ reward, labels = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const rewardLabel = labels.reward || "DBL Reward";
  const offLabel = labels.off || "OFF";
  const codeLabel = labels.code || "Code:";
  const viewProductLabel = labels.viewProduct || "View Product";
  const openLabel = labels.openReward || "Open Your Reward";
  const unlockedTitle = labels.unlockedTitle || "DBL Reward Unlocked";
  const copyLabel = labels.copyCode || "Copy Code";
  const copiedLabel = labels.copied || "Copied!";

  const copyCode = async () => {
    if (!reward?.code) return;

    try {
      await navigator.clipboard.writeText(reward.code);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = reward.code;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  if (!reward) {
    return (
      <article className="reward-card manual-reward-card">
        <span className="eyebrow">{rewardLabel}</span>
        <h2>{labels.manualTitle || "Thank you for your review."}</h2>
        <p>{labels.manualBody || "Your DBL Reward will be sent manually."}</p>
      </article>
    );
  }

  return (
    <article className={`reward-experience${isOpen ? " is-open" : ""}`}>
      <button className="reward-gift" type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen}>
        <span className="reward-gift-glow" aria-hidden="true"></span>
        <span className="reward-gift-box" aria-hidden="true">
          <span className="reward-gift-lid"></span>
          <span className="reward-gift-ribbon reward-gift-ribbon-vertical"></span>
          <span className="reward-gift-ribbon reward-gift-ribbon-horizontal"></span>
          <span className="reward-gift-spark reward-gift-spark-one"></span>
          <span className="reward-gift-spark reward-gift-spark-two"></span>
          <span className="reward-gift-spark reward-gift-spark-three"></span>
        </span>
        <span className="btn btn-primary reward-open-button">{openLabel}</span>
      </button>

      {isOpen ? (
        <div className="reward-reveal-wrap">
          <article className="reward-card reward-revealed-card">
            <span className="eyebrow">{rewardLabel}</span>
            <h2>
              <span aria-hidden="true">{"\uD83C\uDF81 "}</span>
              {unlockedTitle}
            </h2>
            <p className="reward-product-name-large">{reward.productName}</p>
            <strong className="reward-discount">
              {reward.discount} <span>{offLabel}</span>
            </strong>
            <p className="reward-code">
              <span>{codeLabel}</span> <code>{reward.code}</code>
            </p>
            <div className="reward-actions">
              <button className="btn btn-secondary" type="button" onClick={copyCode}>
                {isCopied ? copiedLabel : copyLabel}
              </button>
              <a className="btn btn-primary" href={reward.pageUrl}>
                {viewProductLabel}
              </a>
            </div>
          </article>
        </div>
      ) : null}
    </article>
  );
}
