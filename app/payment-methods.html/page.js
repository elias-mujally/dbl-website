import SitePageShell from "../../components/SitePageShell";

export const metadata = {
  title: "Alternative Payment Methods | Digital Blueprint Lab",
  description:
    "Alternative payment methods for DBL customers who cannot pay by card through Gumroad. Use Binance Pay or USDT BEP20 and send payment confirmation to DBL.",
};

export default function PaymentMethodsPage() {
  return (
    <SitePageShell ctaHref="/#guide" ctaLabel="View Products">
      <main>
            <section className="page-hero reveal in-view">
              <span className="eyebrow" data-i18n="paymentMethods.eyebrow">Payment Support</span>
              <h1 data-i18n="paymentMethods.title">Alternative Payment Methods</h1>
              <p data-i18n="paymentMethods.intro">If you cannot pay by card through Gumroad, you can use one of the alternative payment methods below.</p>
              <p data-i18n="paymentMethods.productNote">After payment, please send your payment confirmation and the name of the product you want to receive.</p>
            </section>

            <section className="page-section payment-section payment-methods-page-section">
              <div className="payment-grid payment-methods-grid">
                <article className="payment-card reveal in-view">
                  <h2 data-i18n="paymentMethods.binanceTitle">Binance Pay</h2>
                  <p data-i18n="paymentMethods.binanceBody">Use the Binance Pay ID below, then send your confirmation to DBL.</p>
                  <div className="copy-row"><code>968899983</code><button type="button" className="copy-btn" data-copy="968899983" data-i18n="productPage.copyBtn">Copy</button></div>
                </article>
                <article className="payment-card reveal in-view">
                  <h2 data-i18n="paymentMethods.usdtTitle">USDT</h2>
                  <p data-i18n="paymentMethods.usdtBody">Send USDT using the BEP20 network only.</p>
                  <span className="network-label" data-i18n="paymentMethods.networkLabel">Network: BEP20 only</span>
                  <div className="copy-row"><code>0xa12d5b70317d50fed3ea1e19b7f21ff0a97f9a14</code><button type="button" className="copy-btn" data-copy="0xa12d5b70317d50fed3ea1e19b7f21ff0a97f9a14" data-i18n="productPage.copyBtn">Copy</button></div>
                </article>
              </div>
            </section>

            <section className="page-section page-grid">
              <article className="page-panel reveal in-view">
                <h2 data-i18n="paymentMethods.productsTitle">Product Reference</h2>
                <p data-i18n="paymentMethods.productsBody">When sending confirmation, include the exact product name and price.</p>
                <p className="payment-note" data-i18n="paymentMethods.productReferenceNote">When sending payment confirmation, mention the product name and price exactly.</p>
                <ul className="page-list">
                  <li><strong data-i18n="businessSuite.title">DBL Business Suite</strong> - <span>$34.99</span></li>
                  <li><strong data-i18n="promptVaultPage.title">DBL Prompt Vault</strong> - <span>$19.99</span></li>
                  <li><strong data-i18n="clientKit.title">DBL Client Kit</strong> - <span>$14.99</span></li>
                  <li><strong data-i18n="product.title">Digital Launch Bundle</strong> - <span>$14.99</span></li>
                  <li><strong data-i18n="businessIdeasVault.title">DBL Business Ideas Vault</strong> - <span>$17.99</span></li>
                </ul>
              </article>
            </section>

            <section className="page-section page-grid">
              <article className="page-panel reveal in-view">
                <h2 data-i18n="paymentMethods.instructionsTitle">After Payment</h2>
                <ol className="page-list ordered-list">
                  <li data-i18n="paymentMethods.instructions.0">Complete the payment.</li>
                  <li data-i18n="paymentMethods.instructions.1">Take a screenshot or save the transaction confirmation.</li>
                  <li data-i18n="paymentMethods.instructions.2">Send the confirmation to DBL through WhatsApp or email.</li>
                  <li data-i18n="paymentMethods.instructions.3">Include the product name.</li>
                  <li data-i18n="paymentMethods.instructions.4">DBL will send product access after payment confirmation.</li>
                </ol>
              </article>
              <article className="page-panel reveal in-view">
                <h2 data-i18n="paymentMethods.contactTitle">Send Confirmation</h2>
                <p data-i18n="paymentMethods.contactBody">Contact DBL after payment so we can verify your order and send product access.</p>
                <div className="button-row"><a className="btn btn-primary" href="https://wa.me/967736747842" data-i18n="paymentMethods.whatsappButton">WhatsApp</a><a className="btn btn-secondary" href="mailto:dblueprintlab@gmail.com" data-i18n="paymentMethods.emailButton">Email</a></div>
              </article>
            </section>
          </main>
    </SitePageShell>
  );
}
