export default function LanguageSwitcher({ activeLanguage = "en" }) {
  return (
    <div className="language-switcher">
      <button type="button" className={`lang-btn lang-en${activeLanguage === "en" ? " active" : ""}`} data-lang="en">
        EN
      </button>
      <span className="lang-divider">|</span>
      <button type="button" className={`lang-btn lang-ar${activeLanguage === "ar" ? " active" : ""}`} data-lang="ar">
        AR
      </button>
    </div>
  );
}
