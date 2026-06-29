import { Footer, Header, ProductCard } from "../../components";
import HomepageBehavior from "../../components/HomepageBehavior";

export const metadata = {
  title: "Tools & Templates | Digital Blueprint Lab",
  description: "Explore practical digital tools, templates, and ready-to-use resources from Digital Blueprint Lab.",
};

export default function ToolsPage() {
  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <Header brandHref="/" ctaHref="/#guide" ctaLabel="View Products" includeThemeSwitcher={false} />
        <main>
          <section className="page-hero reveal in-view">
            <span className="eyebrow" data-i18n="catalog.toolsEyebrow">
              Ready-To-Use Resources
            </span>
            <h1 data-i18n="catalog.toolsPageTitle">Tools / Templates</h1>
            <p data-i18n="catalog.toolsPageLead">
              Practical kits and templates designed for cleaner, more professional digital execution.
            </p>
          </section>
          <section className="page-section category-product-grid">
            <ProductCard
              className="page-panel category-product-card business-suite-card"
              image="/assets/dbl-business-suite-cover.png"
              imageAlt="DBL Business Suite cover"
              imageAltI18nKey="businessSuite.coverAlt"
              eyebrow="Best Value Bundle"
              eyebrowI18nKey="businessSuite.bestValue"
              eyebrowClassName="eyebrow business-suite-badge"
              title="DBL Business Suite"
              titleI18nKey="businessSuite.title"
              titleTag="h2"
              description="Complete bundle including Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide."
              descriptionI18nKey="businessSuite.shortDescription"
              price="$34.99"
              priceI18nKey="businessSuite.price"
              href="/dbl-business-suite.html"
              buttonLabel="View Bundle"
              buttonI18nKey="businessSuite.viewBundle"
              reveal
            />
            <ProductCard
              className="page-panel category-product-card"
              image="/assets/dbl-client-kit-cover.jpeg"
              imageAlt="DBL Client Kit cover"
              imageAltI18nKey="clientKit.coverAlt"
              eyebrow="Client System"
              eyebrowI18nKey="clientKit.eyebrow"
              title="DBL Client Kit"
              titleI18nKey="clientKit.title"
              titleTag="h2"
              description="DBL Client Kit is a practical client management system for freelancers and digital service providers. It includes ready-to-use client messages, DBL rules, client handling tools, checklists, and real-world examples."
              descriptionI18nKey="clientKit.description"
              price="$14.99"
              href="/dbl-client-kit.html"
              buttonLabel="View Product"
              buttonI18nKey="clientKit.previewBtn"
              reveal
            />
            <ProductCard
              className="page-panel category-product-card"
              image="/assets/dbl-prompt-vault-cover.jpeg"
              imageAlt="DBL Prompt Vault cover"
              imageAltI18nKey="promptVaultPage.coverAlt"
              eyebrow="AI Resource"
              eyebrowI18nKey="promptVaultPage.catalogEyebrow"
              title="DBL Prompt Vault"
              titleI18nKey="promptVaultPage.title"
              titleTag="h2"
              description="A premium collection of 100 professional AI prompts with Arabic explanations, practical use cases, real examples, DBL tips, and an Excel prompt tracker."
              descriptionI18nKey="promptVaultPage.catalogDescription"
              price="$19.99"
              priceNote="Exclusive discount"
              priceNoteI18nKey="promptVaultPage.discount"
              href="/dbl-prompt-vault.html"
              buttonLabel="View Product"
              buttonI18nKey="promptVaultPage.previewBtn"
              reveal
            />
          </section>
        </main>
        <Footer />
      </div>
      <HomepageBehavior />
    </>
  );
}
