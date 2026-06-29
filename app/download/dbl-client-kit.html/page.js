import StaticDownloadPage from "../../../components/StaticDownloadPage";

export const metadata = {
  title: "Download DBL Client Kit | Digital Blueprint Lab",
  description: "Private DBL Client Kit download page for DBL customers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadClientKitPage() {
  return <StaticDownloadPage fileName="download/dbl-client-kit.html" />;
}
