import HomepageBehavior from "./HomepageBehavior";
import { Footer, Header } from "./index";
import { readMainHtml } from "../lib/staticHtml";

export default function StaticHtmlPage({
  fileName,
  ctaHref = "/#cta",
  ctaLabel = "Enter Lab",
  ctaI18nKey = "nav.enterLab",
}) {
  const mainHtml = readMainHtml(fileName);

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
        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
        <Footer />
      </div>
      <HomepageBehavior />
    </>
  );
}
