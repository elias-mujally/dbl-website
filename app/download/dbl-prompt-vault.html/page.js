import StaticDownloadPage from "../../../components/StaticDownloadPage";

export const metadata = {
  title: "Download DBL Prompt Vault | Digital Blueprint Lab",
  description: "Private DBL Prompt Vault download page for DBL customers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadPromptVaultPage() {
  return <StaticDownloadPage fileName="download/dbl-prompt-vault.html" />;
}
