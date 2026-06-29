import StaticHtmlPage from "../../components/StaticHtmlPage";

export const metadata = {
  title: "Alternative Payment Methods | Digital Blueprint Lab",
  description:
    "Alternative payment methods for DBL customers who cannot pay by card through Gumroad. Use Binance Pay or USDT BEP20 and send payment confirmation to DBL.",
};

export default function PaymentMethodsPage() {
  return <StaticHtmlPage fileName="payment-methods.html" ctaHref="/#guide" ctaLabel="View Products" />;
}
