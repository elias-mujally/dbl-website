import HomepageBehavior from "./HomepageBehavior";
import { Footer, Header } from "./index";
import { readMainHtml } from "../lib/staticHtml";

export default function StaticProductPage({ fileName, jsonLd }) {
  const mainHtml = readMainHtml(fileName);

  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <Header brandHref="/" ctaHref="/#guide" ctaLabel="View Products" includeThemeSwitcher={false} />
        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
        <Footer />
      </div>
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <HomepageBehavior />
    </>
  );
}
