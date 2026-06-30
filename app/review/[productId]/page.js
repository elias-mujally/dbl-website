import { notFound } from "next/navigation";
import ReviewForm from "../../../components/ReviewForm";
import SitePageShell from "../../../components/SitePageShell";
import { createPageMetadata } from "../../metadata";
import { getReviewProduct, reviewProducts } from "../../../lib/reviews";

export function generateStaticParams() {
  return Object.keys(reviewProducts).map((productId) => ({ productId }));
}

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = getReviewProduct(productId);
  if (!product) return {};

  return createPageMetadata({
    path: `/review/${productId}`,
    title: `Review ${product.title} | Digital Blueprint Lab`,
    description: `Submit a private DBL review for ${product.title} and unlock a DBL Reward coupon for another product.`,
    image: product.cover,
  });
}

export default async function ProductReviewPage({ params }) {
  const { productId } = await params;
  const product = getReviewProduct(productId);
  if (!product) notFound();

  return (
    <SitePageShell>
      <main>
        <section className="review-page-hero section-grid reveal in-view">
          <div className="product-cover-showcase product-page-cover review-product-cover">
            <img src={product.cover} alt={`${product.title} cover`} data-i18n-alt={product.coverAltI18nKey} />
          </div>
          <div className="section-copy">
            <span className="eyebrow" data-i18n="reviews.pageEyebrow">
              DBL Review
            </span>
            <h1 data-i18n="reviews.pageTitle">Share your product review</h1>
            <h2 data-i18n={product.titleI18nKey}>{product.title}</h2>
            <p data-i18n={product.descriptionI18nKey}>{product.description}</p>
            <p className="review-status-note" data-i18n="reviews.moderationNote">
              Reviews are submitted as pending and only approved reviews appear publicly.
            </p>
          </div>
        </section>

        <section className="page-section review-form-section">
          <ReviewForm product={product} />
        </section>
      </main>
    </SitePageShell>
  );
}
