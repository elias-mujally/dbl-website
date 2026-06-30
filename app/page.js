import { BrandReviewSection, Footer, Header, ProductCard } from "../components";
import {
  FloatingCube3D,
  GlassPanel3D,
  GlowLine,
  LayeredSheets3D,
  Orb3D,
  Ring3D,
} from "../components/Decorative3D";
import SiteBehavior from "../components/SiteBehavior";

export default function Home() {
  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>

        <Header includeThemeSwitcher={false} />

        <main id="top">
          <section className="hero section-grid">
            <div className="hero-copy reveal in-view">
              <span className="eyebrow" data-i18n="hero.eyebrow">
                Practical digital products for builders
              </span>
              <h1 data-i18n="hero.title">Build, Sell, And Work Smarter Online.</h1>
              <p data-i18n="hero.description">
                Digital Blueprint Lab creates practical guides, client systems, templates, and AI resources for
                freelancers, creators, and digital product builders.
              </p>
              <div className="button-row">
                <a className="btn btn-primary" href="#about" data-i18n="hero.exploreBtn">
                  Explore DBL
                </a>
                <a className="btn btn-secondary" href="#guide" data-i18n="hero.blueprintBtn">
                  View Products
                </a>
              </div>
            </div>

            <div className="hero-visual reveal in-view" aria-label="Digital workflow visual">
              <div className="hero-visual-decor" aria-hidden="true">
                <GlassPanel3D className="hero-decor-panel" />
                <Orb3D className="hero-orb-primary" />
                <Orb3D className="hero-orb-secondary" />
                <Ring3D className="hero-ring-primary" />
                <Ring3D className="hero-ring-secondary" />
                <LayeredSheets3D className="hero-layered-sheets" />
                <FloatingCube3D className="hero-cube-primary" />
                <FloatingCube3D className="hero-cube-secondary" />
                <GlowLine className="hero-glow-line-a" />
                <GlowLine className="hero-glow-line-b" />
              </div>
              <div className="orbital-ring"></div>
              <div className="lab-console">
                <div className="console-top">
                  <span></span>
                  <span></span>
                  <span></span>
                  <strong data-i18n="workflow.title">DBL Workflow Core</strong>
                </div>
                <div className="pipeline">
                  <div className="node active" data-i18n="workflow.idea">
                    Idea
                  </div>
                  <div className="node" data-i18n="workflow.system">
                    System
                  </div>
                  <div className="node" data-i18n="workflow.asset">
                    Asset
                  </div>
                  <div className="node" data-i18n="workflow.launch">
                    Launch
                  </div>
                </div>
                <div className="signal-board">
                  <div className="signal-line w80"></div>
                  <div className="signal-line w48"></div>
                  <div className="signal-line w68"></div>
                </div>
              </div>
              <div className="float-card card-a">
                <span data-i18n="workflow.aiWorkflow">AI Resource</span>
                <strong data-i18n="workflow.aiWorkflowBenefit">Prompt Vault live</strong>
              </div>
              <div className="float-card card-b">
                <span data-i18n="workflow.clientSystem">Client System</span>
                <strong data-i18n="workflow.clientSystemBenefit">25 ready messages</strong>
              </div>
              <div className="float-card card-c">
                <span data-i18n="workflow.productMap">Digital Guides</span>
                <strong data-i18n="workflow.productMapBenefit">Clear launch steps</strong>
              </div>
            </div>
          </section>

          <section id="about" className="about section-grid">
            <div className="section-copy reveal in-view">
              <span className="eyebrow" data-i18n="about.eyebrow">
                Practical execution
              </span>
              <h2 data-i18n="about.title">Inside The Lab</h2>
              <p data-i18n="about.description1">
                Digital Blueprint Lab is a modern digital lab focused on practical execution, freelancing systems,
                AI-assisted workflows, and digital product building.
              </p>
              <p data-i18n="about.description2">
                We believe success online is built through systems, execution, and clarity - not fake hype or
                unrealistic promises.
              </p>
            </div>
            <div className="blueprint-panel reveal in-view">
              <div className="blueprint-card wide">
                <span>01</span>
                <strong data-i18n="about.step1">Map the offer</strong>
              </div>
              <div className="blueprint-card">
                <span>02</span>
                <strong data-i18n="about.step2">Build the workflow</strong>
              </div>
              <div className="blueprint-card">
                <span>03</span>
                <strong data-i18n="about.step3">Ship the asset</strong>
              </div>
              <div className="diagram-line line-one"></div>
              <div className="diagram-line line-two"></div>
            </div>
          </section>

          <section className="product business-suite-feature">
            <div className="section-heading reveal">
              <span className="eyebrow business-suite-badge" data-i18n="businessSuite.premiumBundle">
                Premium Business Bundle
              </span>
              <h2 data-i18n="businessSuite.title">DBL Business Suite</h2>
              <p data-i18n="businessSuite.homeDescription">
                The complete DBL business system in one premium bundle for freelancers, creators, and digital
                entrepreneurs.
              </p>
            </div>
            <div className="product-stage business-suite-stage reveal">
              <div className="product-cover-showcase business-suite-cover">
                <img
                  src="/assets/dbl-business-suite-cover.png"
                  alt="DBL Business Suite cover"
                  data-i18n-alt="businessSuite.coverAlt"
                />
              </div>
              <ProductCard
                as="div"
                eyebrow="Best Value Bundle"
                eyebrowI18nKey="businessSuite.bestValue"
                title="DBL Business Suite"
                titleI18nKey="businessSuite.title"
                productId="business-suite"
                description="Complete bundle including Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide."
                descriptionI18nKey="businessSuite.shortDescription"
                price="$34.99"
                priceI18nKey="businessSuite.price"
                originalPrice="$49.97"
                originalPriceI18nKey="businessSuite.originalValue"
                href="/dbl-business-suite.html"
                buttonLabel="View Bundle"
                buttonI18nKey="businessSuite.viewBundle"
              />
            </div>
          </section>

          <section className="product new-release-feature">
            <div className="product-stage reveal">
              <div className="product-cover-showcase">
                <img
                  src="/assets/dbl-business-ideas-vault-cover.png"
                  alt="DBL Business Ideas Vault cover"
                  data-i18n-alt="businessIdeasVault.coverAlt"
                />
              </div>
              <ProductCard
                as="div"
                eyebrow="New Release"
                eyebrowI18nKey="businessIdeasVault.homeEyebrow"
                title="DBL Business Ideas Vault"
                titleI18nKey="businessIdeasVault.title"
                productId="business-ideas-vault"
                description="A practical DBL guide that helps beginners choose, evaluate, and start the right business idea through 107 business ideas, clear analysis, realistic examples, AI tools, and a 7-day action plan."
                descriptionI18nKey="businessIdeasVault.shortDescription"
                price="$17.99"
                href="/dbl-business-ideas-vault.html"
                buttonLabel="View Product"
                buttonI18nKey="businessIdeasVault.viewProduct"
              />
            </div>
          </section>

          <section id="guide" className="product">
            <div className="section-heading reveal">
              <span className="eyebrow" data-i18n="catalog.eyebrow">
                Product Catalog
              </span>
              <h2 data-i18n="product.sectionTitle">Digital Products</h2>
              <p data-i18n="catalog.lead">Choose a category and find the right DBL resource for your next step.</p>
            </div>

            <div className="catalog-grid">
              <a className="catalog-card reveal" href="/books.html">
                <span className="catalog-icon">01</span>
                <span className="eyebrow" data-i18n="catalog.booksEyebrow">
                  Guides & Books
                </span>
                <h3 data-i18n="catalog.booksTitle">Books</h3>
                <p data-i18n="catalog.booksBody">
                  Practical digital guides for building skills, systems, and a clearer online direction.
                </p>
                <strong data-i18n="catalog.exploreBooks">Explore Books</strong>
              </a>
              <a className="catalog-card reveal" href="/tools.html">
                <span className="catalog-icon">02</span>
                <span className="eyebrow" data-i18n="catalog.toolsEyebrow">
                  Ready-To-Use Resources
                </span>
                <h3 data-i18n="catalog.toolsTitle">Tools / Templates</h3>
                <p data-i18n="catalog.toolsBody">Kits, templates, and practical resources designed for cleaner execution.</p>
                <strong data-i18n="catalog.exploreTools">Explore Tools</strong>
              </a>
            </div>
          </section>

          <section className="page-section trust-section">
            <div className="section-heading reveal">
              <span className="eyebrow" data-i18n="trust.eyebrow">
                Trust Basics
              </span>
              <h2 data-i18n="trust.title">Clear Digital Product Delivery</h2>
              <p data-i18n="trust.subtitle">
                Simple, honest purchase and support details without unrealistic income promises.
              </p>
            </div>
            <div className="trust-grid">
              <article className="trust-item reveal">
                <strong data-i18n="trust.items.0.title">Secure checkout via Gumroad</strong>
                <p data-i18n="trust.items.0.body">Card purchases are handled through Gumroad checkout.</p>
              </article>
              <article className="trust-item reveal">
                <strong data-i18n="trust.items.1.title">Instant access after payment</strong>
                <p data-i18n="trust.items.1.body">Gumroad purchases provide product access after checkout.</p>
              </article>
              <article className="trust-item reveal">
                <strong data-i18n="trust.items.2.title">Alternative payment support</strong>
                <p data-i18n="trust.items.2.body">
                  Binance Pay and USDT options are available for customers without cards.
                </p>
              </article>
              <article className="trust-item reveal">
                <strong data-i18n="trust.items.3.title">Digital PDF/resources</strong>
                <p data-i18n="trust.items.3.body">
                  DBL products are practical digital guides, tools, templates, and resources.
                </p>
              </article>
              <article className="trust-item reveal">
                <strong data-i18n="trust.items.4.title">No unrealistic income promises</strong>
                <p data-i18n="trust.items.4.body">DBL focuses on practical execution, not guaranteed income claims.</p>
              </article>
              <article className="trust-item reveal">
                <strong data-i18n="trust.items.5.title">Support via WhatsApp/email</strong>
                <p data-i18n="trust.items.5.body">Contact DBL if you need payment or access support.</p>
              </article>
            </div>
          </section>

          <section className="page-section comparison-section">
            <div className="section-heading reveal">
              <span className="eyebrow" data-i18n="comparison.eyebrow">
                Product Comparison
              </span>
              <h2 data-i18n="comparison.title">Choose The Right DBL Product</h2>
              <p data-i18n="comparison.subtitle">A quick overview of who each resource is best for.</p>
            </div>
            <div className="comparison-grid">
              <article className="comparison-card reveal">
                <h3 data-i18n="businessSuite.title">DBL Business Suite</h3>
                <div className="comparison-meta">
                  <span data-i18n="comparison.products.businessSuite.bestFor">Best for complete DBL system buyers.</span>
                  <span data-i18n="comparison.products.businessSuite.includes">
                    Includes Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide.
                  </span>
                  <span className="comparison-price">$34.99</span>
                </div>
                <a className="btn btn-secondary" href="/dbl-business-suite.html" data-i18n="comparison.viewProduct">
                  View Product
                </a>
              </article>
              <article className="comparison-card reveal">
                <h3 data-i18n="promptVaultPage.title">DBL Prompt Vault</h3>
                <div className="comparison-meta">
                  <span data-i18n="comparison.products.promptVault.bestFor">
                    Best for AI prompts and practical AI workflows.
                  </span>
                  <span data-i18n="comparison.products.promptVault.includes">
                    Includes 100 prompts, Arabic explanations, examples, and tracker.
                  </span>
                  <span className="comparison-price">$19.99</span>
                </div>
                <a className="btn btn-secondary" href="/dbl-prompt-vault.html" data-i18n="comparison.viewProduct">
                  View Product
                </a>
              </article>
              <article className="comparison-card reveal">
                <h3 data-i18n="clientKit.title">DBL Client Kit</h3>
                <div className="comparison-meta">
                  <span data-i18n="comparison.products.clientKit.bestFor">
                    Best for freelancers managing client communication.
                  </span>
                  <span data-i18n="comparison.products.clientKit.includes">
                    Includes messages, rules, tools, checklists, and examples.
                  </span>
                  <span className="comparison-price">$14.99</span>
                </div>
                <a className="btn btn-secondary" href="/dbl-client-kit.html" data-i18n="comparison.viewProduct">
                  View Product
                </a>
              </article>
              <article className="comparison-card reveal">
                <h3 data-i18n="product.title">Digital Launch Bundle</h3>
                <div className="comparison-meta">
                  <span data-i18n="comparison.products.digitalLaunch.bestFor">Best for beginners starting online.</span>
                  <span data-i18n="comparison.products.digitalLaunch.includes">
                    Includes launch guidance, starter resources, and execution foundations.
                  </span>
                  <span className="comparison-price">$14.99</span>
                </div>
                <a className="btn btn-secondary" href="/digital-launch-bundle.html" data-i18n="comparison.viewProduct">
                  View Product
                </a>
              </article>
              <article className="comparison-card reveal">
                <h3 data-i18n="businessIdeasVault.title">DBL Business Ideas Vault</h3>
                <div className="comparison-meta">
                  <span data-i18n="comparison.products.businessIdeas.bestFor">
                    Best for choosing and evaluating a practical business idea.
                  </span>
                  <span data-i18n="comparison.products.businessIdeas.includes">
                    Includes 107 ideas, 8 categories, analysis, AI tools, and a 7-day plan.
                  </span>
                  <span className="comparison-price">$17.99</span>
                </div>
                <a
                  className="btn btn-secondary"
                  href="/dbl-business-ideas-vault.html"
                  data-i18n="comparison.viewProduct"
                >
                  View Product
                </a>
              </article>
            </div>
          </section>

          <section id="systems" className="systems">
            <div className="section-heading reveal">
              <h2 data-i18n="systems.title">What DBL Helps You Build</h2>
              <p data-i18n="systems.subtitle">
                Clear resources connected to published products, practical workflows, and ready-to-use tools.
              </p>
            </div>

            <div className="system-grid">
              <article className="system-card reveal">
                <span className="icon" data-i18n="systems.ai">
                  AI
                </span>
                <h3 data-i18n="systems.aiTitle">AI Prompt Vault</h3>
                <p data-i18n="systems.aiDescription">
                  A ready-to-use AI prompt library for freelancers, creators, and digital builders.
                </p>
              </article>
              <article className="system-card reveal">
                <span className="icon" data-i18n="systems.fs">
                  CS
                </span>
                <h3 data-i18n="systems.fsTitle">Client Systems</h3>
                <p data-i18n="systems.fsDescription">
                  Ready messages, onboarding steps, scope control, pricing replies, and delivery workflows.
                </p>
              </article>
              <article className="system-card reveal">
                <span className="icon" data-i18n="systems.tp">
                  DG
                </span>
                <h3 data-i18n="systems.tpTitle">Digital Guides</h3>
                <p data-i18n="systems.tpDescription">
                  Practical books that turn online work, digital products, and execution into clear steps.
                </p>
              </article>
              <article className="system-card reveal">
                <span className="icon" data-i18n="systems.dt">
                  TT
                </span>
                <h3 data-i18n="systems.dtTitle">Templates & Tools</h3>
                <p data-i18n="systems.dtDescription">
                  Reusable assets for organizing clients, offers, content, products, and delivery.
                </p>
              </article>
              <article className="system-card reveal">
                <span className="icon" data-i18n="systems.pb">
                  WF
                </span>
                <h3 data-i18n="systems.pbTitle">Productivity Workflows</h3>
                <p data-i18n="systems.pbDescription">
                  Simple execution frameworks for moving from idea to published product without getting stuck.
                </p>
              </article>
            </div>
          </section>

          <BrandReviewSection />

          <section id="cta" className="final-cta reveal">
            <span className="eyebrow" data-i18n="cta.eyebrow">
              Launch Protocol
            </span>
            <h2 data-i18n="cta.title">Start Building Your Digital Blueprint Today.</h2>
            <div className="button-row">
              <a className="btn btn-primary" href="#guide" data-i18n="cta.bookBtn">
                View Products
              </a>
              <a className="btn btn-secondary" href="#top" data-i18n="cta.labBtn">
                Back To Top
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
      <SiteBehavior />
    </>
  );
}
