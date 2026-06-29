import SitePageShell from "../../components/SitePageShell";

export const metadata = {
  title: "Terms of Use | Digital Blueprint Lab",
  description: "Digital Blueprint Lab terms of use for products, files, templates, and digital resources.",
};

export default function TermsPage() {
  return (
    <SitePageShell ctaHref="/#cta" ctaLabel="Enter Lab">
      <main>
            <section className="page-hero reveal in-view">
              <span className="eyebrow" data-i18n="pages.terms.eyebrow">Usage rules</span>
              <h1 data-i18n="pages.terms.title">Terms of Use</h1>
              <p data-i18n="pages.terms.lead">These terms define how DBL products, files, templates, and resources may be used.</p>
            </section>
            <section className="page-section policy-content reveal in-view">
              <ul className="page-list terms-list">
                <li data-i18n="pages.terms.rule1">Products are for personal use only.</li>
                <li data-i18n="pages.terms.rule2">Redistribution is prohibited.</li>
                <li data-i18n="pages.terms.rule3">Reselling is prohibited.</li>
                <li data-i18n="pages.terms.rule4">Uploading products to third-party websites is prohibited.</li>
                <li data-i18n="pages.terms.rule5">Sharing purchased files with others is prohibited.</li>
                <li data-i18n="pages.terms.rule6">DBL reserves the right to update products and policies when necessary.</li>
              </ul>
            </section>
          </main>
    </SitePageShell>
  );
}
