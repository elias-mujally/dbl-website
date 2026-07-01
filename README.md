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

Review submissions are written through `lib/reviewStorage.js` using Supabase.

Set `ADMIN_REVIEW_KEY` to protect `/admin/reviews` and the admin review APIs.
Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` so review submissions can be stored durably.

The storage module keeps the public interface behind `createReview`, `getReviews`, `updateReviewStatus`, and `getApprovedReviews`, so the backing database can still be changed later without changing the UI.
