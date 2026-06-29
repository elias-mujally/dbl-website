import StaticProductPage from "../../components/StaticProductPage";

export const metadata = {
  title: "DBL Business Ideas Vault | 107 Practical Business Ideas You Can Start in 2026",
  description:
    "DBL Business Ideas Vault is a premium PDF guide with 107 practical business ideas, clear analysis, realistic examples, AI tools, and a 7-day action plan.",
  alternates: {
    canonical: "https://www.dblab.site/dbl-business-ideas-vault.html",
  },
  openGraph: {
    title: "DBL Business Ideas Vault | 107 Practical Business Ideas You Can Start in 2026",
    description:
      "A practical DBL guide for choosing, evaluating, and starting the right business idea through 107 ideas, clear analysis, AI tools, and a 7-day action plan.",
    url: "https://www.dblab.site/dbl-business-ideas-vault.html",
    images: ["/assets/dbl-business-ideas-vault-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DBL Business Ideas Vault | 107 Practical Business Ideas You Can Start in 2026",
    description: "107 practical business ideas with analysis, examples, AI tools, and a 7-day action plan.",
    images: ["/assets/dbl-business-ideas-vault-cover.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DBL Business Ideas Vault",
  description:
    "Premium PDF guide with 107 practical business ideas, clear analysis, realistic examples, AI tools, and a 7-day action plan.",
  image: "https://www.dblab.site/assets/dbl-business-ideas-vault-cover.png",
  url: "https://www.dblab.site/dbl-business-ideas-vault.html",
  brand: { "@type": "Brand", name: "Digital Blueprint Lab" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "17.99",
    availability: "https://schema.org/InStock",
    url: "https://www.dblab.site/dbl-business-ideas-vault.html",
  },
};

export default function BusinessIdeasVaultPage() {
  return <StaticProductPage fileName="dbl-business-ideas-vault.html" jsonLd={jsonLd} />;
}
