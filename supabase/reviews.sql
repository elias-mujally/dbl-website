create table if not exists public.reviews (
  id text primary key,
  "productId" text not null,
  "productName" text not null,
  name text not null,
  email text not null,
  country text,
  profession text,
  source text not null check (source in ('purchased_from_gumroad', 'early_review_copy')),
  rating integer not null check (rating >= 1 and rating <= 5),
  "purchaseReason" text,
  "likedMost" text,
  "needsImprovement" text,
  "priceValue" text,
  "publicReview" text not null,
  "allowPublish" boolean not null default false,
  "futureReviewProgram" boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create index if not exists reviews_status_created_at_idx on public.reviews (status, "createdAt" desc);
create index if not exists reviews_product_id_status_idx on public.reviews ("productId", status);
