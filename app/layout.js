import Script from "next/script";
import "../styles.css";

const siteUrl = "https://www.dblab.site";
const gaId = "G-6WHSW5T99B";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digital Blueprint Lab | أدوات ومنتجات رقمية للمستقلين وصناع المحتوى",
  description:
    "Digital Blueprint Lab يقدم أدلة عملية، قوالب، أنظمة عمل، وبرومبتات ذكاء اصطناعي للمستقلين، المسوقين، صناع المحتوى، وبناة المنتجات الرقمية.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/assets/dbl-favicon.svg", type: "image/svg+xml" },
      { url: "/assets/dbl-favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/assets/dbl-favicon-512.png",
  },
  openGraph: {
    type: "website",
    siteName: "Digital Blueprint Lab",
    title: "Digital Blueprint Lab | أدوات رقمية عملية للمستقلين وصناع المحتوى",
    description:
      "أدلة، قوالب، أنظمة عمل، وبرومبتات ذكاء اصطناعي تساعدك على بناء وتنفيذ منتجاتك الرقمية بوضوح.",
    url: "/",
    images: ["/assets/dbl-favicon-512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Blueprint Lab | أدوات رقمية عملية",
    description:
      "منتجات رقمية، قوالب، وبرومبتات ذكاء اصطناعي للمستقلين وصناع المحتوى وبناة المنتجات الرقمية.",
    images: ["/assets/dbl-favicon-512.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020611",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <Script
          id="dbl-theme-language-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('language') || 'ar';
                  lang = lang === 'en' ? 'en' : 'ar';
                  document.documentElement.lang = lang;
                  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                  document.documentElement.classList.toggle('rtl', lang === 'ar');
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
                } catch (error) {
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                }
              })();
            `,
          }}
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
        {/* Future Google AdSense script location. Do not add ad units here. */}
        {children}
      </body>
    </html>
  );
}
