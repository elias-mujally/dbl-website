import SiteBehavior from "./SiteBehavior";
import { Footer, Header } from "./index";

export default function SitePageShell({
  children,
  ctaHref = "/#guide",
  ctaLabel = "View Products",
  ctaI18nKey = "nav.enterLab",
  jsonLd,
}) {
  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <Header
          brandHref="/"
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
          ctaI18nKey={ctaI18nKey}
          includeThemeSwitcher={false}
        />
        {children}
        <Footer />
      </div>
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <SiteBehavior />
    </>
  );
}
