import StaticProductPage from "../../components/StaticProductPage";

export const metadata = {
  title: "DBL Business Suite | Premium Business Bundle",
  description:
    "DBL Business Suite is a premium business bundle for freelancers, creators, and digital entrepreneurs with Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide.",
  openGraph: {
    title: "DBL Business Suite | Premium Business Bundle",
    description:
      "Get the complete DBL business system in one premium bundle: AI prompts, client systems, launch frameworks, templates, and a Welcome Guide.",
    url: "/dbl-business-suite.html",
    images: ["/assets/dbl-business-suite-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DBL Business Suite | Premium Business Bundle",
    description: "A complete business bundle for freelancers, creators, and digital entrepreneurs.",
    images: ["/assets/dbl-business-suite-cover.png"],
  },
};

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
  return <StaticProductPage fileName="dbl-business-suite.html" jsonLd={jsonLd} />;
}
