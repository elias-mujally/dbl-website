import { createPageMetadata } from "../metadata";
import SitePageShell from "../../components/SitePageShell";
import PreviewArrowIcon from "../../components/PreviewArrowIcon";
import ReviewSection from "../../components/ReviewSection";

export const metadata = createPageMetadata({
  path: "/dbl-business-suite.html",
  title: "DBL Business Suite | Premium Business Bundle",
  description: "DBL Business Suite is a premium business bundle for freelancers, creators, and digital entrepreneurs with Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide.",
  image: "/assets/dbl-business-suite-cover.png",
  openGraphDescription: "Get the complete DBL business system in one premium bundle: AI prompts, client systems, launch frameworks, templates, and a Welcome Guide.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DBL Business Suite",
  description: "Premium DBL business bundle with Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide.",
  image: "https://www.dblab.site/assets/dbl-business-suite-cover.png",
  url: "https://www.dblab.site/dbl-business-suite.html",
  brand: { "@type": "Brand", name: "Digital Blueprint Lab" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "34.99",
    availability: "https://schema.org/InStock",
    url: "https://www.dblab.site/dbl-business-suite.html",
  },
};

export default function BusinessSuitePage() {
  return (
    <SitePageShell jsonLd={jsonLd}>
      <main>
            <section className="product-page-hero section-grid business-suite-hero reveal in-view">
              <div className="product-cover-showcase product-page-cover business-suite-cover"><img src="/assets/dbl-business-suite-cover.png" alt="DBL Business Suite cover" data-i18n-alt="businessSuite.coverAlt" /></div>
              <div className="section-copy">
                <span className="eyebrow business-suite-badge" data-i18n="businessSuite.premiumBundle">Premium Business Bundle</span>
                <h1 data-i18n="businessSuite.title">DBL Business Suite</h1>
                <p data-i18n="businessSuite.description">DBL Business Suite is a complete business bundle designed for freelancers, creators, and digital entrepreneurs who want practical systems, ready-to-use resources, and AI-powered tools to build, launch, and manage their digital business.</p>
                <div className="business-suite-pricing-box">
                  <div className="pricing-original"><span data-i18n="businessSuite.valueLabel">Original Value</span><del data-i18n="businessSuite.originalValue">$49.97</del></div>
                  <div className="pricing-current"><span data-i18n="businessSuite.priceLabel">Launch Price</span><strong data-i18n="businessSuite.price">$34.99</strong><em data-i18n="businessSuite.savePercent">Save 30%</em></div>
                  <p data-i18n="businessSuite.bundlePriceNote">Bundle price for all 3 paid products.</p>
                </div>
                <div className="button-row"><a className="btn btn-primary" href="https://dblab.gumroad.com/l/yzzjpa" target="_blank" rel="noopener" data-i18n="businessSuite.purchase">Get DBL Business Suite</a><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="productPage.alternativePayment">Alternative Payment Methods</a></div>
              </div>
            </section>

            <section className="page-section page-grid">
              <article className="page-panel reveal in-view"><span className="eyebrow" data-i18n="businessSuite.bestValue">Best Value Bundle</span><h2 data-i18n="businessSuite.overviewTitle">The complete DBL business system</h2><p data-i18n="businessSuite.overviewBody">Instead of purchasing separate products, you receive three paid DBL products plus the Welcome Guide as a free bonus guide in one complete business system.</p></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="businessSuite.gainTitle">What You Get</h2><ul className="page-list"><li data-i18n="businessSuite.benefits.0">100 professional AI prompts</li><li data-i18n="businessSuite.benefits.1">Client communication systems</li><li data-i18n="businessSuite.benefits.2">Launch frameworks</li><li data-i18n="businessSuite.benefits.3">Ready-to-use templates</li><li data-i18n="businessSuite.benefits.4">Welcome Guide</li></ul></article>
            </section>

            <section id="included-products" className="page-section">
              <div className="section-heading reveal in-view"><span className="eyebrow" data-i18n="businessSuite.includesEyebrow">Inside The Bundle</span><h2 data-i18n="businessSuite.includesTitle">Included Products</h2><p data-i18n="businessSuite.includesLead">Three paid DBL products plus the Welcome Guide as a free bonus guide.</p></div>
              <div className="catalog-grid business-suite-includes">
                <article className="catalog-card reveal in-view"><span className="catalog-icon">01</span><h3 data-i18n="businessSuite.includes.0">DBL Prompt Vault</h3><p data-i18n="businessSuite.includeBodies.0">A ready-to-use AI prompt library for freelancers, creators, and digital builders.</p></article>
                <article className="catalog-card reveal in-view"><span className="catalog-icon">02</span><h3 data-i18n="businessSuite.includes.1">DBL Client Kit</h3><p data-i18n="businessSuite.includeBodies.1">Client messages, rules, tools, checklists, and practical client handling resources.</p></article>
                <article className="catalog-card reveal in-view"><span className="catalog-icon">03</span><h3 data-i18n="businessSuite.includes.2">Digital Launch Bundle</h3><p data-i18n="businessSuite.includeBodies.2">Practical launch guidance for online work, digital products, and execution.</p></article>
                <article className="catalog-card reveal in-view"><span className="catalog-icon">04</span><h3 data-i18n="businessSuite.includes.3">Welcome Guide</h3><p data-i18n="businessSuite.includeBodies.3">A quick starting guide to help you use the full suite with clarity.</p></article>
              </div>
            </section>


            <section className="page-section product-preview-section business-suite-preview" aria-labelledby="business-suite-preview-title">
              <div className="section-heading reveal in-view">
                <span className="eyebrow" data-i18n="preview.eyebrow">Product Preview</span>
                <h2 id="business-suite-preview-title" data-i18n="businessSuite.previewTitle">See what is inside DBL Business Suite before buying</h2>
                <p data-i18n="businessSuite.previewBody">A quick look at the core products included in the bundle: Digital Launch Bundle, DBL Client Kit, and DBL Prompt Vault.</p>
              </div>
              <div className="preview-carousel reveal in-view" data-preview-carousel="" data-preview-interval="5000">
                <div className="preview-carousel-stage">
                  <button className="preview-nav preview-prev" type="button" data-preview-prev="" data-i18n-aria-label="businessSuite.previewPrevious"><PreviewArrowIcon direction="previous" /></button>
                  <button className="preview-main-button" type="button" data-preview-open="" data-i18n-aria-label="businessSuite.previewOpen">
                    <img src="/assets/previews/dbl-business-suite/business-suite-preview-01-digital-launch.png" alt="Digital Launch Bundle preview inside DBL Business Suite" data-preview-main="" data-i18n-alt="businessSuite.previewAlt.0" />
                  </button>
                  <button className="preview-nav preview-next" type="button" data-preview-next="" data-i18n-aria-label="businessSuite.previewNext"><PreviewArrowIcon direction="next" /></button>
                </div>
                <div className="preview-dots" role="tablist" aria-label="DBL Business Suite preview slides">
                  <button type="button" className="active" data-preview-dot="0" data-i18n-aria-label="businessSuite.previewSlideLabel">1</button>
                  <button type="button" data-preview-dot="1" data-i18n-aria-label="businessSuite.previewSlideLabel">2</button>
                  <button type="button" data-preview-dot="2" data-i18n-aria-label="businessSuite.previewSlideLabel">3</button>
                </div>
                <div className="preview-thumbnails" aria-label="DBL Business Suite preview thumbnails">
                  <button type="button" className="active" data-preview-thumb="0"><img src="/assets/previews/dbl-business-suite/business-suite-preview-01-digital-launch.png" data-preview-slide="" alt="Digital Launch Bundle preview thumbnail inside DBL Business Suite" data-i18n-alt="businessSuite.previewAlt.0" /></button>
                  <button type="button" data-preview-thumb="1"><img src="/assets/previews/dbl-business-suite/business-suite-preview-02-client-kit.png" data-preview-slide="" alt="DBL Client Kit preview thumbnail inside DBL Business Suite" loading="lazy" data-i18n-alt="businessSuite.previewAlt.1" /></button>
                  <button type="button" data-preview-thumb="2"><img src="/assets/previews/dbl-business-suite/business-suite-preview-03-prompt-vault.png" data-preview-slide="" alt="DBL Prompt Vault preview thumbnail inside DBL Business Suite" loading="lazy" data-i18n-alt="businessSuite.previewAlt.2" /></button>
                </div>
                <div className="preview-lightbox" data-preview-lightbox="" hidden>
                  <button type="button" className="preview-lightbox-close" data-preview-close="" data-i18n-aria-label="businessSuite.previewClose">&times;</button>
                  <img src="/assets/previews/dbl-business-suite/business-suite-preview-01-digital-launch.png" alt="Digital Launch Bundle preview inside DBL Business Suite" data-preview-lightbox-image="" data-i18n-alt="businessSuite.previewAlt.0" />
                </div>
              </div>
            </section>

            <section className="page-section page-grid product-detail-grid">
              <article className="page-panel reveal in-view"><h2 data-i18n="businessSuite.audienceTitle">Who Is This For?</h2><ul className="page-list"><li data-i18n="businessSuite.audience.0">Freelancers</li><li data-i18n="businessSuite.audience.1">Digital Product Creators</li><li data-i18n="businessSuite.audience.2">Service Providers</li><li data-i18n="businessSuite.audience.3">Content Creators</li><li data-i18n="businessSuite.audience.4">Online Entrepreneurs</li></ul></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="businessSuite.resultsTitle">What Will You Gain?</h2><ul className="page-list"><li data-i18n="businessSuite.gains.0">A clearer system for building and launching digital products</li><li data-i18n="businessSuite.gains.1">Better AI outputs through structured prompts</li><li data-i18n="businessSuite.gains.2">More professional client communication</li><li data-i18n="businessSuite.gains.3">Reusable templates for practical execution</li></ul></article>
            </section>
            <ReviewSection productId="business-suite" />

            <section className="page-section">
              <div className="section-heading reveal in-view"><span className="eyebrow" data-i18n="businessSuite.faqEyebrow">Quick Answers</span><h2 data-i18n="businessSuite.faqTitle">Business Suite FAQ</h2></div>
              <div className="faq-grid">
                <article className="page-panel reveal in-view"><h3 data-i18n="businessSuite.faq.0.q">What do I get after purchase?</h3><p data-i18n="businessSuite.faq.0.a">You receive DBL Prompt Vault, DBL Client Kit, Digital Launch Bundle, and the Welcome Guide bonus.</p></article>
                <article className="page-panel reveal in-view"><h3 data-i18n="businessSuite.faq.1.q">Is this a subscription?</h3><p data-i18n="businessSuite.faq.1.a">No. DBL Business Suite is a one-time digital bundle purchase.</p></article>
                <article className="page-panel reveal in-view"><h3 data-i18n="businessSuite.faq.2.q">Can I pay without a card?</h3><p data-i18n="businessSuite.faq.2.a">Yes. Use the Alternative Payment Methods page if Gumroad card checkout is unavailable.</p></article>
                <article className="page-panel reveal in-view"><h3 data-i18n="businessSuite.faq.3.q">Who is this bundle for?</h3><p data-i18n="businessSuite.faq.3.a">It is built for freelancers, creators, service providers, and online entrepreneurs who want practical systems.</p></article>
                <article className="page-panel reveal in-view"><h3 data-i18n="businessSuite.faq.4.q">Are the files delivered instantly?</h3><p data-i18n="businessSuite.faq.4.a">Gumroad purchases provide instant access. Alternative payments are delivered after confirmation.</p></article>
              </div>
            </section>

            <section className="page-section suite-cta-panel reveal in-view">
              <span className="eyebrow business-suite-badge" data-i18n="businessSuite.premiumBundle">Premium Business Bundle</span>
              <h2 data-i18n="businessSuite.finalCtaTitle">Ready to build with the complete DBL system?</h2>
              <p data-i18n="businessSuite.finalCtaBody">Get the full suite now, or use alternative payment methods if card checkout is unavailable in your country.</p>
              <div className="button-row"><a className="btn btn-primary" href="https://dblab.gumroad.com/l/yzzjpa" target="_blank" rel="noopener" data-i18n="businessSuite.purchase">Get DBL Business Suite</a><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="productPage.alternativePayment">Alternative Payment Methods</a></div>
            </section>

            <section className="page-section">
              <div className="section-heading reveal in-view"><span className="eyebrow" data-i18n="businessSuite.relatedEyebrow">Related Products</span><h2 data-i18n="businessSuite.relatedTitle">Explore Individual DBL Products</h2></div>
              <div className="catalog-grid">
                <a className="catalog-card reveal in-view" href="/dbl-prompt-vault.html"><span className="catalog-icon">AI</span><h3 data-i18n="promptVaultPage.title">DBL Prompt Vault</h3><p data-i18n="promptVaultPage.catalogDescription">A premium collection of 100 professional AI prompts with Arabic explanations, practical use cases, real examples, DBL tips, and an Excel prompt tracker.</p><strong data-i18n="promptVaultPage.previewBtn">View Product</strong></a>
                <a className="catalog-card reveal in-view" href="/dbl-client-kit.html"><span className="catalog-icon">CK</span><h3 data-i18n="clientKit.title">DBL Client Kit</h3><p data-i18n="clientKit.description">DBL Client Kit is a practical client management system for freelancers and digital service providers.</p><strong data-i18n="clientKit.previewBtn">View Product</strong></a>
                <a className="catalog-card reveal in-view" href="/digital-launch-bundle.html"><span className="catalog-icon">DL</span><h3 data-i18n="product.title">Digital Launch Bundle</h3><p data-i18n="product.description">A practical digital starter bundle for online work, digital products, freelancing systems, and modern execution.</p><strong data-i18n="product.previewBtn">View Product</strong></a>
              </div>
            </section>
          </main>
    </SitePageShell>
  );
}
