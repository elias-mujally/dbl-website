export default function PreviewArrowIcon({ direction }) {
  const points = direction === "next" ? "9 18 15 12 9 6" : "15 18 9 12 15 6";

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <polyline points={points} />
    </svg>
  );
}
