import { Footer, Header, ProductCard } from "../../components";
import HomepageBehavior from "../../components/HomepageBehavior";

export const metadata = {
  title: "Books | Digital Blueprint Lab",
  description: "Explore practical digital books and guides from Digital Blueprint Lab.",
};

export default function BooksPage() {
  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <Header brandHref="/" ctaHref="/#guide" ctaLabel="View Products" includeThemeSwitcher={false} />
        <main>
          <section className="page-hero reveal in-view">
            <span className="eyebrow" data-i18n="catalog.booksEyebrow">
              Guides & Books
            </span>
            <h1 data-i18n="catalog.booksPageTitle">Books</h1>
            <p data-i18n="catalog.booksPageLead">Practical guides built to turn digital ideas into organized action.</p>
          </section>
          <section className="page-section category-product-grid">
            <ProductCard
              className="page-panel category-product-card"
              image="/assets/dbl-business-ideas-vault-cover.png"
              imageAlt="DBL Business Ideas Vault cover"
              imageAltI18nKey="businessIdeasVault.coverAlt"
              eyebrow="New Premium Guide"
              eyebrowI18nKey="businessIdeasVault.catalogEyebrow"
              title="DBL Business Ideas Vault"
              titleI18nKey="businessIdeasVault.title"
              titleTag="h2"
              description="A practical DBL guide that helps beginners choose, evaluate, and start the right business idea through 107 business ideas, clear analysis, realistic examples, AI tools, and a 7-day action plan."
              descriptionI18nKey="businessIdeasVault.shortDescription"
              price="$17.99"
              href="/dbl-business-ideas-vault.html"
              buttonLabel="View Product"
              buttonI18nKey="businessIdeasVault.viewProduct"
              reveal
            />
            <ProductCard
              className="page-panel category-product-card"
              image="/assets/digital-launch-bundle-cover.png"
              imageAlt="Digital Launch Bundle cover"
              imageAltI18nKey="product.coverAlt"
              eyebrow="Featured Product"
              eyebrowI18nKey="product.eyebrow"
              title="Digital Launch Bundle"
              titleI18nKey="product.title"
              titleTag="h2"
              description="A practical digital starter bundle designed to help beginners understand online work, digital products, client communication, freelancing systems, and modern digital execution."
              descriptionI18nKey="product.description"
              price="$14.99"
              href="/digital-launch-bundle.html"
              buttonLabel="View Product"
              buttonI18nKey="product.previewBtn"
              reveal
            />
          </section>
          <section className="page-section pricing-panel business-suite-upsell reveal in-view">
            <span className="eyebrow business-suite-badge" data-i18n="businessSuite.bestValue">
              Best Value Bundle
            </span>
            <h2 data-i18n="businessSuite.booksUpsellTitle">Want the complete business system?</h2>
            <p data-i18n="businessSuite.booksUpsellBody">
              Get DBL Business Suite and receive Digital Launch Bundle, DBL Client Kit, and DBL Prompt Vault in one
              premium bundle.
            </p>
            <div className="button-row">
              <a className="btn btn-primary" href="/dbl-business-suite.html" data-i18n="businessSuite.booksUpsellButton">
                View DBL Business Suite
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <HomepageBehavior />
    </>
  );
}
