import { Footer, Header } from "../../components";
import SiteBehavior from "../../components/SiteBehavior";

const description =
  "Learn why Digital Blueprint Lab creates practical digital products, AI-powered resources, templates, and systems that help creators, freelancers, and digital builders move from ideas to execution.";

export const metadata = {
  title: "About Digital Blueprint Lab | Practical Digital Systems for Builders",
  description,
  alternates: {
    canonical: "/about.html",
  },
  openGraph: {
    title: "About Digital Blueprint Lab | Practical Digital Systems for Builders",
    description,
    url: "/about.html",
    images: ["/assets/dbl-favicon-512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Digital Blueprint Lab | Practical Digital Systems for Builders",
    description,
    images: ["/assets/dbl-favicon-512.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <Header brandHref="/" ctaHref="/#cta" ctaLabel="Enter Lab" includeThemeSwitcher={false} />
        <main>
          <section className="page-hero about-hero reveal in-view">
            <span className="eyebrow" data-i18n="pages.about.eyebrow">
              About DBL
            </span>
            <h1 data-i18n="pages.about.title">About Digital Blueprint Lab</h1>
            <p data-i18n="pages.about.lead">
              Digital Blueprint Lab is an independent digital lab built to help creators, freelancers, and digital
              builders move from scattered ideas to practical execution.
            </p>
          </section>

          <blockquote className="about-quote about-hero-quote reveal in-view">
            <p data-i18n="pages.about.identityQuote">We do not sell information. We build systems that help you execute.</p>
          </blockquote>

          <section className="page-section about-story">
            <div className="about-section-heading reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.whyEyebrow">
                Why DBL Exists
              </span>
              <h2 data-i18n="pages.about.whyTitle">Why we created DBL</h2>
            </div>
            <div className="about-copy-panel reveal in-view">
              <p data-i18n="pages.about.whyBody1">
                In a world full of information, the problem is no longer a lack of knowledge. The real challenge is
                knowing what to learn, where to begin, and what deserves your time.
              </p>
              <p data-i18n="pages.about.whyBody2">
                Anyone can find thousands of articles, courses, and videos. But only a small part of that content helps
                you turn an idea into a real project.
              </p>
              <p data-i18n="pages.about.whyBody3">
                That is why Digital Blueprint Lab exists. We create practical digital products that help people move
                from thinking to execution through clear guides, work systems, ready templates, and usable resources.
              </p>
              <p data-i18n="pages.about.whyBody4">
                Our goal is not to add more information to the internet. Our goal is to give you tools that help you
                execute your ideas with more clarity and professionalism.
              </p>
            </div>
          </section>

          <section className="page-section about-feature-section">
            <div className="about-section-heading reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.differenceEyebrow">
                DBL Products
              </span>
              <h2 data-i18n="pages.about.differenceTitle">What makes DBL products different?</h2>
              <p data-i18n="pages.about.differenceLead">
                We do not create digital products just to sell files. Every product is shaped around a practical
                standard.
              </p>
            </div>
            <div className="about-card-grid">
              <article className="about-card reveal in-view">
                <h3 data-i18n="pages.about.differenceCards.0.title">Practical first</h3>
                <p data-i18n="pages.about.differenceCards.0.body">Built to be used in real work, not only read as theory.</p>
              </article>
              <article className="about-card reveal in-view">
                <h3 data-i18n="pages.about.differenceCards.1.title">Simple by design</h3>
                <p data-i18n="pages.about.differenceCards.1.body">Clear enough to start with, without unnecessary complexity.</p>
              </article>
              <article className="about-card reveal in-view">
                <h3 data-i18n="pages.about.differenceCards.2.title">Execution ready</h3>
                <p data-i18n="pages.about.differenceCards.2.body">
                  Designed to help you take action, organize work, and build repeatable systems.
                </p>
              </article>
              <article className="about-card reveal in-view">
                <h3 data-i18n="pages.about.differenceCards.3.title">Always improving</h3>
                <p data-i18n="pages.about.differenceCards.3.body">
                  Products can evolve with better practices, new tools, and real user needs.
                </p>
              </article>
            </div>
          </section>

          <section className="page-section about-philosophy-section">
            <article className="page-panel about-philosophy reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.philosophyEyebrow">
                Philosophy
              </span>
              <h2 data-i18n="pages.about.philosophyTitle">The DBL philosophy</h2>
              <p data-i18n="pages.about.philosophyBody1">
                Successful digital projects are not built on temporary motivation. They are built through clear systems,
                consistent work, and continuous improvement.
              </p>
              <p data-i18n="pages.about.philosophyBody2">
                Technology changes. Platforms change. Tools evolve. But the ability to solve problems and create real
                value will always matter.
              </p>
            </article>
          </section>

          <section className="page-section about-audience-section">
            <div className="about-section-heading reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.audienceEyebrow">
                Who We Serve
              </span>
              <h2 data-i18n="pages.about.audienceTitle">Who is DBL designed for?</h2>
              <p data-i18n="pages.about.audienceLead">
                DBL is for people who want to build digital work in a practical, organized, and improvable way.
              </p>
            </div>
            <div className="about-pill-grid">
              <span data-i18n="pages.about.audience.0">Freelancers</span>
              <span data-i18n="pages.about.audience.1">Entrepreneurs</span>
              <span data-i18n="pages.about.audience.2">Students</span>
              <span data-i18n="pages.about.audience.3">Content creators</span>
              <span data-i18n="pages.about.audience.4">Digital product builders</span>
              <span data-i18n="pages.about.audience.5">Beginners in online work</span>
            </div>
          </section>

          <section className="page-section page-grid about-evolution">
            <article className="page-panel reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.evolutionEyebrow">
                Continuous Product Growth
              </span>
              <h2 data-i18n="pages.about.evolutionTitle">Products that keep evolving</h2>
              <p data-i18n="pages.about.evolutionBody">
                We do not treat any DBL product as final forever. Each product can improve through customer feedback,
                practical use, new technologies, and better modern practices.
              </p>
            </article>
            <article className="page-panel reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.missionEyebrow">
                Mission
              </span>
              <h2 data-i18n="pages.about.missionTitle">Our mission</h2>
              <p data-i18n="pages.about.missionBody">
                We aim to make building digital projects clearer, more organized, and easier to apply through practical
                systems, real tools, and products that help people start with clear steps.
              </p>
            </article>
          </section>

          <section className="page-section about-principles-section">
            <div className="about-section-heading reveal in-view">
              <span className="eyebrow" data-i18n="pages.about.principlesEyebrow">
                Principles
              </span>
              <h2 data-i18n="pages.about.principlesTitle">DBL principles</h2>
            </div>
            <div className="about-principles-grid">
              {["01", "02", "03", "04", "05", "06", "07"].map((number, index) => (
                <article className="about-principle reveal in-view" key={number}>
                  <span>{number}</span>
                  <p data-i18n={`pages.about.principles.${index}`}>
                    {
                      [
                        "Build before chasing perfection.",
                        "Create solutions for real problems.",
                        "Execution matters more than excessive planning.",
                        "Systems create consistency.",
                        "Learning is a process that never stops.",
                        "Use AI to increase your abilities, not replace your thinking.",
                        "Publish, learn, improve, and repeat.",
                      ][index]
                    }
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="page-section about-final-cta reveal in-view">
            <span className="eyebrow" data-i18n="pages.about.ctaEyebrow">
              Start Today
            </span>
            <h2 data-i18n="pages.about.ctaTitle">Every successful project starts with one clear step.</h2>
            <p data-i18n="pages.about.ctaBody">
              Welcome to Digital Blueprint Lab. Your first step today may become the beginning of something bigger than
              you imagine.
            </p>
            <div className="button-row">
              <a className="btn btn-primary" href="/#guide" data-i18n="pages.about.ctaButton">
                Explore DBL Products
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
