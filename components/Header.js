import LanguageSwitcher from "./LanguageSwitcher";
import Navigation from "./Navigation";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header({
  brandHref = "#top",
  brandLabel = "Digital Blueprint Lab home",
  ctaHref = "/#cta",
  ctaLabel = "Enter Lab",
  ctaI18nKey = "nav.enterLab",
  includeThemeSwitcher = true,
}) {
  return (
    <header className="nav">
      <a className="brand" href={brandHref} aria-label={brandLabel}>
        <span className="brand-mark">DBL</span>
        <span className="brand-name" data-i18n="nav.brand">
          Digital Blueprint Lab
        </span>
      </a>
      <Navigation />
      <div className="nav-controls">
        {includeThemeSwitcher ? <ThemeSwitcher /> : null}
        <LanguageSwitcher />
        <a className="nav-cta" href={ctaHref} data-i18n={ctaI18nKey}>
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
