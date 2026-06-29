import StaticProductPage from "../../components/StaticProductPage";

export const metadata = {
  title: "Digital Launch Bundle | Digital Blueprint Lab",
  description:
    "Digital Launch Bundle by Digital Blueprint Lab: a practical starter bundle for online work, digital products, client communication, freelancing systems, and digital execution.",
};

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
  return <StaticProductPage fileName="digital-launch-bundle.html" jsonLd={jsonLd} />;
}
