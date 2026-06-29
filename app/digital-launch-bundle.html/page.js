import { createPageMetadata } from "../metadata";
﻿import SitePageShell from "../../components/SitePageShell";

export const metadata = createPageMetadata({
  path: "/digital-launch-bundle.html",
  title: "Digital Launch Bundle | Digital Blueprint Lab",
  description: "Digital Launch Bundle by Digital Blueprint Lab: a practical starter bundle for online work, digital products, client communication, freelancing systems, and digital execution.",
  image: "/assets/digital-launch-bundle-cover.png",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Digital Launch Bundle",
  description: "Practical starter bundle for online work, digital products, client communication, freelancing systems, and execution.",
  image: "https://www.dblab.site/assets/digital-launch-bundle-cover.png",
  url: "https://www.dblab.site/digital-launch-bundle.html",
  brand: { "@type": "Brand", name: "Digital Blueprint Lab" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "14.99",
    availability: "https://schema.org/InStock",
    url: "https://www.dblab.site/digital-launch-bundle.html",
  },
};

export default function DigitalLaunchBundlePage() {
  return (
    <SitePageShell jsonLd={jsonLd}>
      <main>
            <section className="product-page-hero section-grid reveal in-view">
              <div className="product-cover-showcase product-page-cover"><img src="/assets/digital-launch-bundle-cover.png" alt="Digital Launch Bundle cover" data-i18n-alt="product.coverAlt" /></div>
              <div className="section-copy">
                <span className="eyebrow" data-i18n="productPage.eyebrow">Official DBL Product</span>
                <h1 data-i18n="product.title">Digital Launch Bundle</h1>
                <p data-i18n="product.description">A practical digital starter bundle designed to help beginners understand online work, digital products, client communication, freelancing systems, and modern digital execution.</p>
                <div className="price-badge"><span data-i18n="productPage.priceLabel">Launch Price</span><strong>$14.99 USD</strong></div>
                <div className="button-row"><a className="btn btn-primary" href="https://dblab.gumroad.com/l/yhjxs" target="_blank" rel="noopener" data-i18n="productPage.buyNow">Get Instant Access</a><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="productPage.alternativePayment">Alternative Payment Methods</a></div>
              </div>
            </section>

            <section className="page-section page-grid">
              <article className="page-panel reveal in-view"><h2 data-i18n="productPage.learnTitle">What Will You Learn?</h2><ul className="page-list"><li data-i18n="productPage.learn.0">How online work and digital products fit together</li><li data-i18n="productPage.learn.1">How to communicate with clients more clearly</li><li data-i18n="productPage.learn.2">How to structure practical freelance systems</li><li data-i18n="productPage.learn.3">How to start executing with organized digital steps</li></ul></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="productPage.whoTitle">Who Is This For?</h2><ul className="page-list"><li data-i18n="productPage.who.0">Beginners exploring online work</li><li data-i18n="productPage.who.1">Creators building their first digital product</li><li data-i18n="productPage.who.2">Freelancers who need clearer systems</li><li data-i18n="productPage.who.3">Digital builders who want practical direction</li></ul></article>
            </section>

            <section className="page-section page-grid product-detail-grid">
              <article className="page-panel reveal in-view"><h2 data-i18n="productPage.contentsTitle">Bundle Contents</h2><ul className="page-list"><li>Digital Launch Guide PDF</li><li>Beginner-friendly launch roadmap</li><li>Client communication starter resources</li><li>Practical online work foundations</li><li>Simple digital execution system</li></ul></article>
              <article className="page-panel reveal in-view"><h2 data-i18n="productPage.bonusTitle">DBL Starter Kit Bonus</h2><p data-i18n="productPage.bonusBody">The starter kit gives you a simple operating base for organizing ideas, client communication, and early digital execution without unnecessary complexity.</p></article>
            </section>


            <section className="page-section product-preview-section digital-launch-preview" aria-labelledby="digital-launch-preview-title">
              <div className="section-heading reveal in-view">
                <span className="eyebrow" data-i18n="preview.eyebrow">Product Preview</span>
                <h2 id="digital-launch-preview-title" data-i18n="product.previewTitle">See a real preview from inside the Digital Launch Bundle before buying</h2>
                <p data-i18n="product.previewBody">Selected pages from inside the product showing the structure, starting steps, digital work systems, and how the bundle is used.</p>
              </div>
              <div className="preview-carousel reveal in-view" data-preview-carousel="" data-preview-interval="5000">
                <div className="preview-carousel-stage">
                  <button className="preview-nav preview-prev" type="button" data-preview-prev="" data-i18n-aria-label="product.previewPrevious">â€¹</button>
                  <button className="preview-main-button" type="button" data-preview-open="" data-i18n-aria-label="product.previewOpen">
                    <img src="/assets/previews/digital-launch-bundle/digital-launch-preview-01-cover.png" alt="Digital Launch Bundle cover preview" data-preview-main="" data-i18n-alt="product.previewAlt.0" />
                  </button>
                  <button className="preview-nav preview-next" type="button" data-preview-next="" data-i18n-aria-label="product.previewNext">â€؛</button>
                </div>
                <div className="preview-dots" role="tablist" aria-label="Digital Launch Bundle preview slides">
                  <button type="button" className="active" data-preview-dot="0" data-i18n-aria-label="product.previewSlideLabel">1</button>
                  <button type="button" data-preview-dot="1" data-i18n-aria-label="product.previewSlideLabel">2</button>
                  <button type="button" data-preview-dot="2" data-i18n-aria-label="product.previewSlideLabel">3</button>
                  <button type="button" data-preview-dot="3" data-i18n-aria-label="product.previewSlideLabel">4</button>
                  <button type="button" data-preview-dot="4" data-i18n-aria-label="product.previewSlideLabel">5</button>
                  <button type="button" data-preview-dot="5" data-i18n-aria-label="product.previewSlideLabel">6</button>
                </div>
                <div className="preview-thumbnails" aria-label="Digital Launch Bundle preview thumbnails">
                  <button type="button" className="active" data-preview-thumb="0"><img src="/assets/previews/digital-launch-bundle/digital-launch-preview-01-cover.png" data-preview-slide="" alt="Digital Launch Bundle cover preview thumbnail" data-i18n-alt="product.previewAlt.0" /></button>
                  <button type="button" data-preview-thumb="1"><img src="/assets/previews/digital-launch-bundle/digital-launch-preview-02-intro-page.png" data-preview-slide="" alt="Digital Launch Bundle introduction page preview thumbnail" loading="lazy" data-i18n-alt="product.previewAlt.1" /></button>
                  <button type="button" data-preview-thumb="2"><img src="/assets/previews/digital-launch-bundle/digital-launch-preview-03-chapter-start.png" data-preview-slide="" alt="Digital Launch Bundle chapter start preview thumbnail" loading="lazy" data-i18n-alt="product.previewAlt.2" /></button>
                  <button type="button" data-preview-thumb="3"><img src="/assets/previews/digital-launch-bundle/digital-launch-preview-04-content-system.png" data-preview-slide="" alt="Digital Launch Bundle content system preview thumbnail" loading="lazy" data-i18n-alt="product.previewAlt.3" /></button>
                  <button type="button" data-preview-thumb="4"><img src="/assets/previews/digital-launch-bundle/digital-launch-preview-05-action-template.png" data-preview-slide="" alt="Digital Launch Bundle action template preview thumbnail" loading="lazy" data-i18n-alt="product.previewAlt.4" /></button>
                  <button type="button" data-preview-thumb="5"><img src="/assets/previews/digital-launch-bundle/digital-launch-preview-06-client-lab.png" data-preview-slide="" alt="Digital Launch Bundle client lab preview thumbnail" loading="lazy" data-i18n-alt="product.previewAlt.5" /></button>
                </div>
                <div className="preview-lightbox" data-preview-lightbox="" hidden>
                  <button type="button" className="preview-lightbox-close" data-preview-close="" data-i18n-aria-label="product.previewClose">×</button>
                  <img src="/assets/previews/digital-launch-bundle/digital-launch-preview-01-cover.png" alt="Digital Launch Bundle cover preview" data-preview-lightbox-image="" data-i18n-alt="product.previewAlt.0" />
                </div>
              </div>
            </section>

            <section className="page-section page-grid"><article className="page-panel reveal in-view"><h2 data-i18n="productPage.aboutTitle">About Digital Blueprint Lab</h2><p data-i18n="productPage.aboutBody">Digital Blueprint Lab is an independent digital lab focused on practical systems, AI workflows, digital products, freelancing foundations, and clean execution for long-term digital growth.</p></article><article className="page-panel reveal in-view"><h2 data-i18n="productPage.finalTitle">Start With A Practical Blueprint</h2><p data-i18n="productPage.finalBody">Use Gumroad for instant card checkout. If you cannot pay by card, use the Alternative Payment Methods page and send your confirmation with the product name.</p><div className="button-row"><a className="btn btn-secondary" href="/payment-methods.html" data-i18n="productPage.alternativePayment">Alternative Payment Methods</a></div></article></section>
          </main>
    </SitePageShell>
  );
}
