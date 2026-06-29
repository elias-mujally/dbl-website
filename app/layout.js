import "../styles.css";

export const metadata = {
  title: "Digital Blueprint Lab",
  description: "Digital Blueprint Lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
