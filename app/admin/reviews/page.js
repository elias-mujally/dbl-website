import AdminReviewsDashboard from "../../../components/AdminReviewsDashboard";
import SitePageShell from "../../../components/SitePageShell";

export const metadata = {
  title: "Review Moderation | Digital Blueprint Lab",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminReviewsPage({ searchParams }) {
  const params = await searchParams;
  const initialKey = typeof params?.key === "string" ? params.key : "";

  return (
    <SitePageShell>
      <main>
        <section className="page-section admin-review-section">
          <div className="section-heading reveal in-view">
            <span className="eyebrow">Admin</span>
            <h1>Review Moderation</h1>
            <p>Approve or reject submitted DBL product reviews. Approved reviews become public automatically.</p>
          </div>
          <AdminReviewsDashboard initialKey={initialKey} />
        </section>
      </main>
    </SitePageShell>
  );
}
