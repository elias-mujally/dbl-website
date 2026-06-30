export default function RewardCard({ reward, labels = {} }) {
  const rewardLabel = labels.reward || "DBL Reward";
  const offLabel = labels.off || "OFF";
  const codeLabel = labels.code || "Code:";
  const viewProductLabel = labels.viewProduct || "View Product";

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
    <article className="reward-card">
      <span className="eyebrow">{rewardLabel}</span>
      <h2>{reward.productName}</h2>
      <strong className="reward-discount">
        {reward.discount} <span>{offLabel}</span>
      </strong>
      <p className="reward-code">
        <span>{codeLabel}</span> <code>{reward.code}</code>
      </p>
      <a className="btn btn-primary" href={reward.pageUrl}>
        {viewProductLabel}
      </a>
    </article>
  );
}
