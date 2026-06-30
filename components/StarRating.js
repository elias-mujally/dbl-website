export default function StarRating({ rating = 0, label }) {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(Number(rating))));

  return (
    <span className="star-rating" aria-label={label || `${normalizedRating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < normalizedRating ? "is-filled" : ""} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}
