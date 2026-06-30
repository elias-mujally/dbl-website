import { createPageMetadata } from "../metadata";
import SitePageShell from "../../components/SitePageShell";
import PreviewArrowIcon from "../../components/PreviewArrowIcon";
import ReviewSection from "../../components/ReviewSection";

export const metadata = createPageMetadata({
  path: "/dbl-prompt-vault.html",
  title: "DBL Prompt Vault | 100 Professional AI Prompts",
  description: "Get DBL Prompt Vault: 100 professional AI prompts with Arabic explanations, practical use cases, real examples, DBL tips, and a Prompt Tracker Excel template.",
  image: "/assets/dbl-prompt-vault-cover.jpeg",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DBL Prompt Vault",
  description: "100 professional AI prompts with Arabic explanations, practical use cases, examples, DBL tips, and a prompt tracker.",
  image: "https://www.dblab.site/assets/dbl-prompt-vault-cover.jpeg",
  url: "https://www.dblab.site/dbl-prompt-vault.html",
  brand: { "@type": "Brand", name: "Digital Blueprint Lab" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "19.99",
    availability: "https://schema.org/InStock",
    url: "https://www.dblab.site/dbl-prompt-vault.html",
  },
};

export default function PromptVaultPage() {
  return (
    <SitePageShell jsonLd={jsonLd}>
      <main>
            <section className="product-page-hero section-grid reveal in-view">
              <div className="product-cover-showcase product-page-cover"><img src="/assets/dbl-prompt-vault-cover.jpeg" alt="DBL Prompt Vault cover" data-i18n-alt="promptVaultPage.coverAlt" /></div>
              <div className="section-copy">
                <span className="eyebrow" data-i18n="promptVaultPage.eyebrow">Premium AI Resource</span>
                <h1 data-i18n="promptVaultPage.title">DBL Prompt Vault</h1>
                <p data-i18n="promptVaultPage.tagline">100 Professional AI Prompts for Freelancers, Marketers, Content Creators &amp; Digital Product Builders.</p>
                <p data-i18n="promptVaultPage.description">DBL Prompt Vault is a premium collection of 100 professional AI prompts designed to help freelancers, marketers, content creators, and digital entrepreneurs achieve better results faster.</p>
                <div className="price-badge prompt-vault-price"><span>Official Price</span><div className="prompt-vault-price-row"><strong>$19.99</strong></div><small>Instant access via Gumroad</small></div>
                <div className="button-row"><a className="btn btn-primary" href="https://dblab.gumroad.com/l/oigexi" target="_blank" rel="noopener" data-i18n="promptVaultPage.cta">Get Instant Access</a><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="promptVaultPage.alternativePayment">Alternative Payment Methods</a>
                </div>
              </div>
            </section>

            <section className="page-section page-grid">
              <article className="page-panel reveal in-view"><h2 data-i18n="promptVaultPage.includedTitle">Included In The Vault</h2><ul className="page-list"><li data-i18n="promptVaultPage.included.0">100 Professional AI Prompts</li><li data-i18n="promptVaultPage.included.1">Arabic Explanations</li><li data-i18n="promptVaultPage.included.2">Practical Use Cases</li><li data-i18n="promptVaultPage.included.3">Expected Outcomes</li><li data-i18n="promptVaultPage.included.4">Real Examples</li><li data-i18n="promptVaultPage.included.5">DBL Tips</li><li data-i18n="promptVaultPage.included.6">Prompt Tracking Excel Template</li></ul></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="promptVaultPage.receivesTitle">What You Receive</h2><ul className="page-list"><li data-i18n="promptVaultPage.receives.0">DBL Prompt Vault PDF</li><li data-i18n="promptVaultPage.receives.1">DBL Prompt Tracker Excel Template</li><li data-i18n="promptVaultPage.receives.2">Instant Access After Payment</li></ul><p data-i18n="promptVaultPage.receivesBody">Designed to save time, improve productivity, and help you get higher-quality AI outputs.</p></article>
            </section>

            <section className="page-section">
              <div className="section-heading reveal in-view"><span className="eyebrow" data-i18n="promptVaultPage.highlightsEyebrow">Inside The System</span><h2 data-i18n="promptVaultPage.highlightsTitle">Product Highlights</h2></div>
              <div className="catalog-grid prompt-vault-highlights"><article className="catalog-card reveal in-view"><h3 data-i18n="promptVaultPage.highlights.0">7 Structured Business Tracks</h3></article><article className="catalog-card reveal in-view"><h3 data-i18n="promptVaultPage.highlights.1">100 Carefully Selected Prompts</h3></article><article className="catalog-card reveal in-view"><h3 data-i18n="promptVaultPage.highlights.2">Arabic Learning Experience</h3></article><article className="catalog-card reveal in-view"><h3 data-i18n="promptVaultPage.highlights.3">Practical Business Applications</h3></article><article className="catalog-card reveal in-view"><h3 data-i18n="promptVaultPage.highlights.4">Freelancer &amp; Creator Focus</h3></article><article className="catalog-card reveal in-view"><h3 data-i18n="promptVaultPage.highlights.5">Ready-to-Use System</h3></article></div>
            </section>

            <section className="page-section page-grid"><article className="page-panel reveal in-view"><h2 data-i18n="promptVaultPage.trustTitle">Why Choose DBL Prompt Vault?</h2><ul className="page-list"><li data-i18n="promptVaultPage.trust.0">Save Hours of Trial and Error</li><li data-i18n="promptVaultPage.trust.1">Learn Practical AI Workflows</li><li data-i18n="promptVaultPage.trust.2">Improve Productivity</li><li data-i18n="promptVaultPage.trust.3">Get Better Results from AI Tools</li><li data-i18n="promptVaultPage.trust.4">Organized and Easy to Use</li></ul></article><article className="page-panel reveal in-view"><h2 data-i18n="promptVaultPage.builtForTitle">Built For Practical Work</h2><p data-i18n="promptVaultPage.builtForBody">Use the vault as a working system for marketing, freelancing, content creation, digital product building, and everyday AI-assisted execution.</p></article></section>


            <section className="page-section product-preview-section prompt-vault-preview" aria-labelledby="prompt-vault-preview-title">
              <div className="section-heading reveal in-view">
                <span className="eyebrow" data-i18n="preview.eyebrow">Product Preview</span>
                <h2 id="prompt-vault-preview-title" data-i18n="promptVaultPage.previewTitle">See a real preview from inside DBL Prompt Vault before buying</h2>
                <p data-i18n="promptVaultPage.previewBody">Selected pages from inside the product showing the prompt roadmap, business tracks, and ready-to-copy prompt structure.</p>
              </div>
              <div className="preview-carousel reveal in-view" data-preview-carousel="" data-preview-interval="5000">
                <div className="preview-carousel-stage">
                  <button className="preview-nav preview-prev" type="button" data-preview-prev="" data-i18n-aria-label="promptVaultPage.previewPrevious"><PreviewArrowIcon direction="previous" /></button>
                  <button className="preview-main-button" type="button" data-preview-open="" data-i18n-aria-label="promptVaultPage.previewOpen">
                    <img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-01-cover.png" alt="DBL Prompt Vault cover preview" data-preview-main="" data-i18n-alt="promptVaultPage.previewAlt.0" />
                  </button>
                  <button className="preview-nav preview-next" type="button" data-preview-next="" data-i18n-aria-label="promptVaultPage.previewNext"><PreviewArrowIcon direction="next" /></button>
                </div>
                <div className="preview-dots" role="tablist" aria-label="DBL Prompt Vault preview slides">
                  <button type="button" className="active" data-preview-dot="0" data-i18n-aria-label="promptVaultPage.previewSlideLabel">1</button>
                  <button type="button" data-preview-dot="1" data-i18n-aria-label="promptVaultPage.previewSlideLabel">2</button>
                  <button type="button" data-preview-dot="2" data-i18n-aria-label="promptVaultPage.previewSlideLabel">3</button>
                  <button type="button" data-preview-dot="3" data-i18n-aria-label="promptVaultPage.previewSlideLabel">4</button>
                  <button type="button" data-preview-dot="4" data-i18n-aria-label="promptVaultPage.previewSlideLabel">5</button>
                  <button type="button" data-preview-dot="5" data-i18n-aria-label="promptVaultPage.previewSlideLabel">6</button>
                </div>
                <div className="preview-thumbnails" aria-label="DBL Prompt Vault preview thumbnails">
                  <button type="button" className="active" data-preview-thumb="0"><img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-01-cover.png" data-preview-slide="" alt="DBL Prompt Vault cover preview thumbnail" data-i18n-alt="promptVaultPage.previewAlt.0" /></button>
                  <button type="button" data-preview-thumb="1"><img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-02-roadmap.png" data-preview-slide="" alt="DBL Prompt Vault usage roadmap preview thumbnail" loading="lazy" data-i18n-alt="promptVaultPage.previewAlt.1" /></button>
                  <button type="button" data-preview-thumb="2"><img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-03-track-start.png" data-preview-slide="" alt="DBL Prompt Vault business track start preview thumbnail" loading="lazy" data-i18n-alt="promptVaultPage.previewAlt.2" /></button>
                  <button type="button" data-preview-thumb="3"><img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-04-prompt-sample.png" data-preview-slide="" alt="DBL Prompt Vault prompt sample preview thumbnail" loading="lazy" data-i18n-alt="promptVaultPage.previewAlt.3" /></button>
                  <button type="button" data-preview-thumb="4"><img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-05-customer-data.png" data-preview-slide="" alt="DBL Prompt Vault customer data prompt preview thumbnail" loading="lazy" data-i18n-alt="promptVaultPage.previewAlt.4" /></button>
                  <button type="button" data-preview-thumb="5"><img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-06-marketing-system.png" data-preview-slide="" alt="DBL Prompt Vault marketing system prompt preview thumbnail" loading="lazy" data-i18n-alt="promptVaultPage.previewAlt.5" /></button>
                </div>
                <div className="preview-lightbox" data-preview-lightbox="" hidden>
                  <button type="button" className="preview-lightbox-close" data-preview-close="" data-i18n-aria-label="promptVaultPage.previewClose">&times;</button>
                  <img src="/assets/previews/dbl-prompt-vault/prompt-vault-preview-01-cover.png" alt="DBL Prompt Vault cover preview" data-preview-lightbox-image="" data-i18n-alt="promptVaultPage.previewAlt.0" />
                </div>
              </div>
            </section>

            <ReviewSection productId="prompt-vault" />

            <section className="page-section page-grid"><article className="page-panel reveal in-view"><h2 data-i18n="promptVaultPage.manualTitle">Payment Support</h2><p data-i18n="promptVaultPage.manualBody">Use Gumroad for instant card checkout. If you cannot pay by card, use the Alternative Payment Methods page and send your confirmation with the product name.</p><div className="button-row"><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="promptVaultPage.alternativePayment">Alternative Payment Methods</a></div></article></section>
          </main>
    </SitePageShell>
  );
}