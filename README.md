# Digital Blueprint Lab

Native Next.js App Router website for Digital Blueprint Lab.

## Local Preview

```bash
pnpm install
pnpm run dev
```

## Production Build

```bash
pnpm run build
```

Vercel builds the Next.js app with `pnpm run build`.

## Review Moderation Storage

Review submissions are written through `lib/reviewStorage.js`. In local development, the default storage is `data/reviews.json`.

Set `ADMIN_REVIEW_KEY` to protect `/admin/reviews` and the admin review APIs.

File-based writes are useful for local development, but they are not reliable durable production storage on Vercel serverless deployments. For production, replace the storage implementation behind `createReview`, `getReviews`, `updateReviewStatus`, and `getApprovedReviews` with Supabase, Firebase, Vercel KV, Neon, or another durable database.
