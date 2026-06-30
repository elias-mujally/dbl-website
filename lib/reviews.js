export const reviewProducts = {
  "business-ideas-vault": {
    id: "business-ideas-vault",
    title: "DBL Business Ideas Vault",
    titleI18nKey: "businessIdeasVault.title",
    description:
      "A practical DBL guide that helps beginners choose, evaluate, and start the right business idea through 107 business ideas, clear analysis, realistic examples, AI tools, and a 7-day action plan.",
    descriptionI18nKey: "businessIdeasVault.shortDescription",
    pageUrl: "/dbl-business-ideas-vault.html",
    cover: "/assets/dbl-business-ideas-vault-cover.png",
    coverAltI18nKey: "businessIdeasVault.coverAlt",
  },
  "prompt-vault": {
    id: "prompt-vault",
    title: "DBL Prompt Vault",
    titleI18nKey: "promptVaultPage.title",
    description:
      "A premium collection of 100 professional AI prompts with Arabic explanations, practical use cases, real examples, DBL tips, and an Excel prompt tracker.",
    descriptionI18nKey: "promptVaultPage.catalogDescription",
    pageUrl: "/dbl-prompt-vault.html",
    cover: "/assets/dbl-prompt-vault-cover.jpeg",
    coverAltI18nKey: "promptVaultPage.coverAlt",
  },
  "client-kit": {
    id: "client-kit",
    title: "DBL Client Kit",
    titleI18nKey: "clientKit.title",
    description: "DBL Client Kit is a practical client management system for freelancers and digital service providers.",
    descriptionI18nKey: "clientKit.description",
    pageUrl: "/dbl-client-kit.html",
    cover: "/assets/dbl-client-kit-cover.jpeg",
    coverAltI18nKey: "clientKit.coverAlt",
  },
  "digital-launch-bundle": {
    id: "digital-launch-bundle",
    title: "Digital Launch Bundle",
    titleI18nKey: "product.title",
    description:
      "A practical digital starter bundle for online work, digital products, freelancing systems, and modern execution.",
    descriptionI18nKey: "product.description",
    pageUrl: "/digital-launch-bundle.html",
    cover: "/assets/digital-launch-bundle-cover.png",
    coverAltI18nKey: "product.coverAlt",
  },
  "business-suite": {
    id: "business-suite",
    title: "DBL Business Suite",
    titleI18nKey: "businessSuite.title",
    description:
      "Complete bundle including Prompt Vault, Client Kit, Digital Launch Bundle, and Welcome Guide.",
    descriptionI18nKey: "businessSuite.shortDescription",
    pageUrl: "/dbl-business-suite.html",
    cover: "/assets/dbl-business-suite-cover.png",
    coverAltI18nKey: "businessSuite.coverAlt",
  },
};

export const reviewRewards = [
  {
    productId: "prompt-vault",
    productName: "DBL Prompt Vault",
    productNameI18nKey: "promptVaultPage.title",
    discount: "15%",
    code: "DBL-P10V",
    pageUrl: "/dbl-prompt-vault.html",
  },
  {
    productId: "business-suite",
    productName: "DBL Business Suite",
    productNameI18nKey: "businessSuite.title",
    discount: "15%",
    code: "DBL-S5B1",
    pageUrl: "/dbl-business-suite.html",
  },
  {
    productId: "digital-launch-bundle",
    productName: "Digital Launch Bundle",
    productNameI18nKey: "product.title",
    discount: "10%",
    code: "DBL-L0B1",
    pageUrl: "/digital-launch-bundle.html",
  },
  {
    productId: "client-kit",
    productName: "DBL Client Kit",
    productNameI18nKey: "clientKit.title",
    discount: "10%",
    code: "DBL-K1C0",
    pageUrl: "/dbl-client-kit.html",
  },
];

export function getReviewProduct(productId) {
  return reviewProducts[productId] || null;
}

export function getEligibleRewards(reviewedProductId) {
  return reviewRewards.filter((reward) => reward.productId !== reviewedProductId);
}

export function selectRewardForProduct(reviewedProductId, random = Math.random) {
  const eligibleRewards = getEligibleRewards(reviewedProductId);
  if (!eligibleRewards.length) return null;
  return eligibleRewards[Math.floor(random() * eligibleRewards.length)];
}
