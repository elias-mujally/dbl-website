const siteUrl = "https://www.dblab.site";
const defaultImage = "/assets/dbl-favicon-512.png";

export function createPageMetadata({
  path,
  title,
  description,
  image = defaultImage,
  openGraphDescription = description,
  robots = { index: true, follow: true },
}) {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: "Digital Blueprint Lab",
      title,
      description: openGraphDescription,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
