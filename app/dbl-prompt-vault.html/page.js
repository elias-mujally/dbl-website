import StaticProductPage from "../../components/StaticProductPage";

export const metadata = {
  title: "DBL Prompt Vault | 100 Professional AI Prompts",
  description:
    "Get DBL Prompt Vault: 100 professional AI prompts with Arabic explanations, practical use cases, real examples, DBL tips, and a Prompt Tracker Excel template.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DBL Prompt Vault",
  description: "100 professional AI prompts with Arabic explanations, practical use cases, examples, DBL tips, and a prompt tracker.",
  image: "https://www.dblab.site/assets/dbl-prompt-vault-cover.jpeg",
  url: "https://www.dblab.site/dbl-prompt-vault.html",
  brand: { "@type": "Brand", name: "Digital Blueprint Lab" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "19.99",
    availability: "https://schema.org/InStock",
    url: "https://www.dblab.site/dbl-prompt-vault.html",
  },
};

export default function PromptVaultPage() {
  return <StaticProductPage fileName="dbl-prompt-vault.html" jsonLd={jsonLd} />;
}
