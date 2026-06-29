export const primaryNavItems = [
  { href: "/books.html", label: "Books", i18nKey: "nav.books" },
  { href: "/tools.html", label: "Tools", i18nKey: "nav.tools" },
  { href: "/about.html", label: "About", i18nKey: "nav.about" },
  { href: "/contact.html", label: "Contact", i18nKey: "nav.contact" },
];

export const footerNavItems = [
  { href: "/books.html", label: "Books", i18nKey: "footer.books" },
  { href: "/tools.html", label: "Tools", i18nKey: "footer.tools" },
  { href: "/about.html", label: "About", i18nKey: "footer.about" },
  { href: "/refund-policy.html", label: "Refund Policy", i18nKey: "footer.refundPolicy" },
  { href: "/contact.html", label: "Contact", i18nKey: "footer.contact" },
  { href: "/terms.html", label: "Terms", i18nKey: "footer.terms" },
  { href: "/privacy-policy.html", label: "Privacy", i18nKey: "footer.privacy" },
];

export default function Navigation({ items = primaryNavItems, ariaLabel = "Primary navigation", className = "nav-links" }) {
  const navProps = className ? { className } : {};

  return (
    <nav {...navProps} aria-label={ariaLabel}>
      {items.map((item) => (
        <a key={item.href} href={item.href} data-i18n={item.i18nKey}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
