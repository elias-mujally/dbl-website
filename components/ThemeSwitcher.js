export default function ThemeSwitcher({ label = "Light" }) {
  return (
    <button type="button" className="theme-toggle" data-theme-toggle="" aria-pressed="false" aria-label="Light">
      <span className="theme-toggle-icon" aria-hidden="true"></span>
      <span className="theme-toggle-text">{label}</span>
    </button>
  );
}
