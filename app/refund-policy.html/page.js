import SitePageShell from "../../components/SitePageShell";

export const metadata = {
  title: "Refund Policy | Digital Blueprint Lab",
  description: "Digital Blueprint Lab refund policy for digital products and subscription-based services.",
};

export default function RefundPolicyPage() {
  return (
    <SitePageShell ctaHref="/#cta" ctaLabel="Enter Lab">
      <main>
            <section className="page-hero reveal in-view">
              <span className="eyebrow" data-i18n="pages.refund.eyebrow">Policy</span>
              <h1 data-i18n="pages.refund.title">Refund Policy</h1>
              <p data-i18n="pages.refund.lead">This policy explains how refunds are handled for DBL digital products and services.</p>
            </section>
            <section className="page-section policy-content reveal in-view">
              <h2 data-i18n="pages.refund.digitalTitle">Digital products</h2>
              <p data-i18n="pages.refund.digitalBody">Digital products are non-refundable after download or access has been granted.</p>
              <h2 data-i18n="pages.refund.exceptionTitle">Subscription exception</h2>
              <p data-i18n="pages.refund.exceptionBody">Products or services that require recurring monthly subscriptions may be eligible for cancellation according to their subscription terms.</p>
              <h2 data-i18n="pages.refund.supportTitle">Support</h2>
              <p data-i18n="pages.refund.supportBody">If you have questions about access, delivery, or subscription cancellation, contact DBL through the official contact channels.</p>
            </section>
          </main>
    </SitePageShell>
  );
}
