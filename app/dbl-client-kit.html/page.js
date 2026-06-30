import { createPageMetadata } from "../metadata";
import SitePageShell from "../../components/SitePageShell";
import PreviewArrowIcon from "../../components/PreviewArrowIcon";
import ReviewSection from "../../components/ReviewSection";

export const metadata = createPageMetadata({
  path: "/dbl-client-kit.html",
  title: "DBL Client Kit | Digital Blueprint Lab",
  description: "DBL Client Kit is a practical client management system for freelancers and digital service providers.",
  image: "/assets/dbl-client-kit-cover.jpeg",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DBL Client Kit",
  description: "Practical client management system for freelancers and digital service providers.",
  image: "https://www.dblab.site/assets/dbl-client-kit-cover.jpeg",
  url: "https://www.dblab.site/dbl-client-kit.html",
  brand: { "@type": "Brand", name: "Digital Blueprint Lab" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "14.99",
    availability: "https://schema.org/InStock",
    url: "https://www.dblab.site/dbl-client-kit.html",
  },
};

export default function ClientKitPage() {
  return (
    <SitePageShell jsonLd={jsonLd}>
      <main>
            <section className="product-page-hero section-grid reveal in-view">
              <div className="product-cover-showcase product-page-cover"><img src="/assets/dbl-client-kit-cover.jpeg" alt="DBL Client Kit cover" data-i18n-alt="clientKit.coverAlt" /></div>
              <div className="section-copy">
                <span className="eyebrow" data-i18n="clientKitPage.eyebrow">Official DBL Product</span>
                <h1 data-i18n="clientKit.title">DBL Client Kit</h1>
                <p data-i18n="clientKit.description">DBL Client Kit is a practical client management system for freelancers and digital service providers. It includes ready-to-use client messages, DBL rules, client handling tools, checklists, and real-world examples to help users manage communication, pricing, revisions, delivery, and difficult client situations more professionally.</p>
                <div className="price-badge"><span data-i18n="clientKitPage.priceLabel">Launch Price</span><strong>$14.99 USD</strong></div>
                <div className="button-row"><a className="btn btn-primary" href="https://dblab.gumroad.com/l/gfrthg" target="_blank" rel="noopener" data-i18n="clientKitPage.buyNow">Get Instant Access</a><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="clientKitPage.alternativePayment">Alternative Payment Methods</a></div>
              </div>
            </section>

            <section className="page-section page-grid">
              <article className="page-panel reveal in-view"><h2 data-i18n="clientKitPage.contentsTitle">What Is Included?</h2><ul className="page-list"><li data-i18n="clientKitPage.contents.0">25 ready-to-use client messages</li><li data-i18n="clientKitPage.contents.1">15 DBL client management rules</li><li data-i18n="clientKitPage.contents.2">10 common client relationship mistakes</li><li data-i18n="clientKitPage.contents.3">10 practical real-world examples</li><li data-i18n="clientKitPage.contents.4">9 DBL tools</li><li data-i18n="clientKitPage.contents.5">3 professional checklists</li><li data-i18n="clientKitPage.contents.6">Communication, pricing, revision, delivery, and follow-up templates</li></ul></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="clientKitPage.whoTitle">Who Is This For?</h2><ul className="page-list"><li data-i18n="clientKitPage.who.0">Freelancers</li><li data-i18n="clientKitPage.who.1">Designers</li><li data-i18n="clientKitPage.who.2">Marketers</li><li data-i18n="clientKitPage.who.3">Digital service providers</li><li data-i18n="clientKitPage.who.4">Beginners in online work</li><li data-i18n="clientKitPage.who.5">People who want to manage clients more professionally</li></ul></article>
            </section>

            <section className="page-section page-grid product-detail-grid">
              <article className="page-panel reveal in-view"><h2 data-i18n="clientKitPage.benefitsTitle">Benefits</h2><ul className="page-list"><li data-i18n="clientKitPage.benefits.0">Communicate with clients more clearly</li><li data-i18n="clientKitPage.benefits.1">Handle pricing and revisions with confidence</li><li data-i18n="clientKitPage.benefits.2">Deliver work with a professional process</li><li data-i18n="clientKitPage.benefits.3">Respond to difficult client situations more effectively</li></ul></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="clientKitPage.systemTitle">A Practical Client System</h2><p data-i18n="clientKitPage.systemBody">Use the kit as a working reference for everyday freelance conversations, revisions, pricing decisions, delivery steps, follow-ups, and client boundaries.</p></article>
            </section>


            <section className="page-section product-preview-section client-kit-preview" aria-labelledby="client-kit-preview-title">
              <div className="section-heading reveal in-view">
                <span className="eyebrow" data-i18n="preview.eyebrow">Product Preview</span>
                <h2 id="client-kit-preview-title" data-i18n="clientKitPage.previewTitle">See a real preview from inside DBL Client Kit before buying</h2>
                <p data-i18n="clientKitPage.previewBody">Selected pages from inside the product showing client rules, message templates, delivery workflows, and practical client tools.</p>
              </div>
              <div className="preview-carousel reveal in-view" data-preview-carousel="" data-preview-interval="5000">
                <div className="preview-carousel-stage">
                  <button className="preview-nav preview-prev" type="button" data-preview-prev="" data-i18n-aria-label="clientKitPage.previewPrevious"><PreviewArrowIcon direction="previous" /></button>
                  <button className="preview-main-button" type="button" data-preview-open="" data-i18n-aria-label="clientKitPage.previewOpen">
                    <img src="/assets/previews/dbl-client-kit/client-kit-preview-01-cover.png" alt="DBL Client Kit cover preview" data-preview-main="" data-i18n-alt="clientKitPage.previewAlt.0" />
                  </button>
                  <button className="preview-nav preview-next" type="button" data-preview-next="" data-i18n-aria-label="clientKitPage.previewNext"><PreviewArrowIcon direction="next" /></button>
                </div>
                <div className="preview-dots" role="tablist" aria-label="DBL Client Kit preview slides">
                  <button type="button" className="active" data-preview-dot="0" data-i18n-aria-label="clientKitPage.previewSlideLabel">1</button>
                  <button type="button" data-preview-dot="1" data-i18n-aria-label="clientKitPage.previewSlideLabel">2</button>
                  <button type="button" data-preview-dot="2" data-i18n-aria-label="clientKitPage.previewSlideLabel">3</button>
                  <button type="button" data-preview-dot="3" data-i18n-aria-label="clientKitPage.previewSlideLabel">4</button>
                  <button type="button" data-preview-dot="4" data-i18n-aria-label="clientKitPage.previewSlideLabel">5</button>
                </div>
                <div className="preview-thumbnails" aria-label="DBL Client Kit preview thumbnails">
                  <button type="button" className="active" data-preview-thumb="0"><img src="/assets/previews/dbl-client-kit/client-kit-preview-01-cover.png" data-preview-slide="" alt="DBL Client Kit cover preview thumbnail" data-i18n-alt="clientKitPage.previewAlt.0" /></button>
                  <button type="button" data-preview-thumb="1"><img src="/assets/previews/dbl-client-kit/client-kit-preview-02-rules.png" data-preview-slide="" alt="DBL Client Kit client rules preview thumbnail" loading="lazy" data-i18n-alt="clientKitPage.previewAlt.1" /></button>
                  <button type="button" data-preview-thumb="2"><img src="/assets/previews/dbl-client-kit/client-kit-preview-03-before-agreement.png" data-preview-slide="" alt="DBL Client Kit before agreement section preview thumbnail" loading="lazy" data-i18n-alt="clientKitPage.previewAlt.2" /></button>
                  <button type="button" data-preview-thumb="3"><img src="/assets/previews/dbl-client-kit/client-kit-preview-04-delivery.png" data-preview-slide="" alt="DBL Client Kit delivery section preview thumbnail" loading="lazy" data-i18n-alt="clientKitPage.previewAlt.3" /></button>
                  <button type="button" data-preview-thumb="4"><img src="/assets/previews/dbl-client-kit/client-kit-preview-05-tools.png" data-preview-slide="" alt="DBL Client Kit tools preview thumbnail" loading="lazy" data-i18n-alt="clientKitPage.previewAlt.4" /></button>
                </div>
                <div className="preview-lightbox" data-preview-lightbox="" hidden>
                  <button type="button" className="preview-lightbox-close" data-preview-close="" data-i18n-aria-label="clientKitPage.previewClose">&times;</button>
                  <img src="/assets/previews/dbl-client-kit/client-kit-preview-01-cover.png" alt="DBL Client Kit cover preview" data-preview-lightbox-image="" data-i18n-alt="clientKitPage.previewAlt.0" />
                </div>
              </div>
            </section>

            <ReviewSection productId="client-kit" />

            <section className="page-section page-grid"><article className="page-panel reveal in-view"><h2 data-i18n="clientKitPage.aboutTitle">About Digital Blueprint Lab</h2><p data-i18n="clientKitPage.aboutBody">Digital Blueprint Lab is an independent digital lab focused on practical systems, AI workflows, digital products, freelancing foundations, and clean execution for long-term digital growth.</p></article><article className="page-panel reveal in-view"><h2 data-i18n="clientKitPage.finalTitle">Get Access To DBL Client Kit</h2><p data-i18n="clientKitPage.finalBody">Use Gumroad for instant card checkout. If you cannot pay by card, use the Alternative Payment Methods page and send your confirmation with the product name.</p><div className="button-row"><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="clientKitPage.alternativePayment">Alternative Payment Methods</a></div></article></section>
          </main>
    </SitePageShell>
  );
}
