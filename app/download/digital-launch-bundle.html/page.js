import { createPageMetadata } from "../../metadata";
import DownloadPageShell from "../../../components/DownloadPageShell";

export const metadata = createPageMetadata({
  path: "/download/digital-launch-bundle.html",
  title: "Download Digital Launch Bundle | Digital Blueprint Lab",
  description: "Private Digital Launch Bundle download page for DBL customers.",
  robots: {"index":false,"follow":false},
});

export default function DownloadDigitalLaunchBundlePage() {
  return (
    <DownloadPageShell>
      <main className="download-main">
            <section className="download-panel reveal in-view">
              <span className="eyebrow" data-i18n="downloadPages.privateAccess">Private Customer Access</span>
              <h1 data-i18n="downloadPages.title">Thank you for your trust in DBL</h1>
              <p data-i18n="downloadPages.launchBundle.message">Your purchase has been completed successfully. You can download your product using the button below.</p>
              <a className="btn btn-primary download-btn" href="/assets/digital-launch-bundle.zip" download data-i18n="downloadPages.launchBundle.button">Download The Book</a>

              <div className="download-support">
                <p data-i18n="downloadPages.support">If you face any issue, contact us:</p>
                <a href="mailto:dblueprintlab@gmail.com">dblueprintlab@gmail.com</a>
                <a href="https://wa.me/967736747842" data-i18n="downloadPages.whatsapp">WhatsApp: +967736747842</a>
              </div>
            </section>
          </main>
    </DownloadPageShell>
  );
}
