import Navigation, { footerNavItems } from "./Navigation";

export const socialLinks = [
  { href: "https://www.instagram.com/dbl_lap", label: "Instagram", text: "IG" },
  { href: "https://www.facebook.com/share/18NR4xWCvr/", label: "Facebook", text: "FB" },
  { href: "https://www.tiktok.com/@dbl_lap", label: "TikTok", text: "TT" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="/" aria-label="Digital Blueprint Lab home">
        <span className="brand-mark">DBL</span>
        <span className="brand-name" data-i18n="footer.brand">
          Digital Blueprint Lab
        </span>
      </a>
      <Navigation items={footerNavItems} ariaLabel="Footer navigation" className={null} />
      <div className="socials">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} aria-label={link.label}>
            {link.text}
          </a>
        ))}
      </div>
    </footer>
  );
}
