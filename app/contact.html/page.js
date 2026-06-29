import { Footer, Header } from "../../components";
import SiteBehavior from "../../components/SiteBehavior";

export const metadata = {
  title: "Contact | Digital Blueprint Lab",
  description: "Contact Digital Blueprint Lab by email, Instagram, Facebook, TikTok, or WhatsApp.",
};

const contactCards = [
  { href: "mailto:dblueprintlab@gmail.com", key: "pages.contact.email", label: "Email", value: "dblueprintlab@gmail.com" },
  { href: "https://www.instagram.com/dbl_lap", key: "pages.contact.instagram", label: "Instagram", value: "@dbl_lap" },
  { href: "https://www.facebook.com/share/18NR4xWCvr/", key: "pages.contact.facebook", label: "Facebook", value: "Digital Blueprint Lab" },
  { href: "https://www.tiktok.com/@dbl_lap", key: "pages.contact.tiktok", label: "TikTok", value: "@dbl_lap" },
  { href: "https://wa.me/967736747842", key: "pages.contact.whatsapp", label: "WhatsApp", value: "+967736747842" },
];

export default function ContactPage() {
  return (
    <>
      <div className="site-shell">
        <div className="ambient ambient-a"></div>
        <div className="ambient ambient-b"></div>
        <Header brandHref="/" ctaHref="/#cta" ctaLabel="Enter Lab" includeThemeSwitcher={false} />
        <main>
          <section className="page-hero reveal in-view">
            <span className="eyebrow" data-i18n="pages.contact.eyebrow">
              Contact
            </span>
            <h1 data-i18n="pages.contact.title">Connect with Digital Blueprint Lab.</h1>
            <p data-i18n="pages.contact.lead">
              Use the official channels below for questions, support, collaborations, or product inquiries.
            </p>
          </section>
          <section className="page-section contact-grid">
            {contactCards.map((card) => (
              <a className="contact-card reveal in-view" href={card.href} key={card.href}>
                <span data-i18n={card.key}>{card.label}</span>
                <strong>{card.value}</strong>
              </a>
            ))}
          </section>
        </main>
        <Footer />
      </div>
      <SiteBehavior />
    </>
  );
}
