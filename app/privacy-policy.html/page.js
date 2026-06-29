import SitePageShell from "../../components/SitePageShell";

export const metadata = {
  title: "Privacy Policy | Digital Blueprint Lab",
  description:
    "Digital Blueprint Lab privacy policy covering analytics, website usage, contact information, cookies, and data protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <SitePageShell ctaHref="/#cta" ctaLabel="Enter Lab">
      <main>
            <section className="page-hero reveal in-view">
              <span className="eyebrow" data-i18n="pages.privacy.eyebrow">Privacy</span>
              <h1 data-i18n="pages.privacy.title">Privacy Policy</h1>
              <p data-i18n="pages.privacy.lead">This policy explains how DBL handles simple website data, contact information, cookies, and analytics.</p>
            </section>
            <section className="page-section policy-content reveal in-view">
              <h2 data-i18n="pages.privacy.analyticsTitle">Visitor analytics</h2>
              <p data-i18n="pages.privacy.analyticsBody">DBL may use basic analytics to understand visitor activity, page performance, and general website usage.</p>
              <h2 data-i18n="pages.privacy.usageTitle">Website usage information</h2>
              <p data-i18n="pages.privacy.usageBody">Usage information may include pages visited, device type, browser type, and approximate interaction data.</p>
              <h2 data-i18n="pages.privacy.contactTitle">Contact information</h2>
              <p data-i18n="pages.privacy.contactBody">If you contact DBL, your message and contact details are used only to respond to your request or provide support.</p>
              <h2 data-i18n="pages.privacy.cookiesTitle">Cookies</h2>
              <p data-i18n="pages.privacy.cookiesBody">The website may use cookies or local storage for basic functionality such as saving language preferences.</p>
              <h2 data-i18n="pages.privacy.protectionTitle">Data protection</h2>
              <p data-i18n="pages.privacy.protectionBody">DBL is committed to handling information responsibly and keeping data collection simple, limited, and relevant.</p>
            </section>
          </main>
    </SitePageShell>
  );
}
