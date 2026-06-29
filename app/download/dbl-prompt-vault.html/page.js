import DownloadPageShell from "../../../components/DownloadPageShell";

export const metadata = {
  title: "Download DBL Prompt Vault | Digital Blueprint Lab",
  description: "Private DBL Prompt Vault download page for DBL customers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadPromptVaultPage() {
  return (
    <DownloadPageShell>
      <main className="download-main">
            <section className="download-panel reveal in-view">
              <span className="eyebrow" data-i18n="downloadPages.privateAccess">Private Customer Access</span>
              <h1 data-i18n="downloadPages.promptVault.title">DBL Prompt Vault</h1>
              <p data-i18n="downloadPages.promptVault.subtitle">Thank you for your purchase.</p>
              <p data-i18n="downloadPages.promptVault.confirmation">Your purchase has been confirmed successfully.</p>
              <p data-i18n="downloadPages.promptVault.instructions">You can download your product files using the buttons below.</p>
              <p data-i18n="downloadPages.promptVault.wish">We hope you have a useful experience and achieve great results.</p>

              <div className="button-row download-actions">
                <a className="btn btn-primary download-btn" href="/assets/dbl-prompt-vault.pdf" download data-i18n="downloadPages.promptVault.pdfButton">Download PDF</a>
                <a className="btn btn-secondary download-btn" href="/assets/dbl-prompt-tracker.xlsx" download data-i18n="downloadPages.promptVault.excelButton">Download Excel</a>
              </div>

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
