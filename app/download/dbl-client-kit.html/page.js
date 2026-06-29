import { createPageMetadata } from "../../metadata";
import DownloadPageShell from "../../../components/DownloadPageShell";

export const metadata = createPageMetadata({
  path: "/download/dbl-client-kit.html",
  title: "Download DBL Client Kit | Digital Blueprint Lab",
  description: "Private DBL Client Kit download page for DBL customers.",
  robots: {"index":false,"follow":false},
});

export default function DownloadClientKitPage() {
  return (
    <DownloadPageShell>
      <main className="download-main">
            <section className="download-panel reveal in-view">
              <span className="eyebrow" data-i18n="downloadPages.privateAccess">Private Customer Access</span>
              <h1 data-i18n="downloadPages.title">Thank you for your trust in DBL</h1>
              <p data-i18n="downloadPages.clientKit.message">Your purchase has been completed successfully. We hope DBL Client Kit helps you manage clients more professionally.</p>
              <a className="btn btn-primary download-btn" href="/assets/dbl-client-kit.pdf" download data-i18n="downloadPages.clientKit.button">Download DBL Client Kit</a>

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
