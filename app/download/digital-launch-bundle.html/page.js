import StaticDownloadPage from "../../../components/StaticDownloadPage";

export const metadata = {
  title: "Download Digital Launch Bundle | Digital Blueprint Lab",
  description: "Private Digital Launch Bundle download page for DBL customers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadDigitalLaunchBundlePage() {
  return <StaticDownloadPage fileName="download/digital-launch-bundle.html" />;
}
