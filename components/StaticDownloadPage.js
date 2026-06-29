import HomepageBehavior from "./HomepageBehavior";
import LanguageSwitcher from "./LanguageSwitcher";
import { readMainHtml } from "../lib/staticHtml";

export default function StaticDownloadPage({ fileName }) {
  const mainHtml = readMainHtml(fileName);

  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <header className="nav download-nav">
          <span className="brand" aria-label="Digital Blueprint Lab">
            <span className="brand-mark">DBL</span>
            <span className="brand-name" data-i18n="nav.brand">
              Digital Blueprint Lab
            </span>
          </span>
          <LanguageSwitcher />
        </header>
        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </div>
      <HomepageBehavior />
    </>
  );
}
