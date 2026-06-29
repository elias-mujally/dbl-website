import StaticProductPage from "../../components/StaticProductPage";

export const metadata = {
  title: "DBL Client Kit | Digital Blueprint Lab",
  description: "DBL Client Kit is a practical client management system for freelancers and digital service providers.",
};

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
  return <StaticProductPage fileName="dbl-client-kit.html" jsonLd={jsonLd} />;
}
