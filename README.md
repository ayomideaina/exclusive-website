# Exclusive E-Commerce Next.js App

This project rebuilds the Exclusive e-commerce experience in Next.js with the App Router, Redux Toolkit for client-side cart/wishlist state, and Firebase authentication integration.

## Rendering strategy choices

- Home page: SSG with revalidation
  - The homepage is mostly static and benefits from fast first-load performance and SEO-friendly output.
  - The route uses cached product data with revalidation to keep product lists fresh without sacrificing performance.
- Product details: ISR with revalidation
  - Product details are mostly static but can change over time, so periodic refreshes are a good balance between speed and freshness.
  - The route fetches product data from a cached source and revalidates every 60 seconds.
- Sign up / login: static shell + client-side auth
  - The forms render as a static shell and the Firebase auth calls happen on submit inside client components.
- Cart / wishlist / account: client-side rendering with auth protection
  - These screens are personalized and depend on authenticated state, so they remain client-rendered behind the auth guard.
- 404: Next.js not-found convention
  - Invalid product IDs use the App Router not-found pattern rather than a generic error route.

## Where the required patterns live

- Authentication hook: [hooks/useAuth.js](hooks/useAuth.js)
- Shared form validation hook: [hooks/useForm.js](hooks/useForm.js)
- Higher-order auth wrapper: [hocs/withAuth.jsx](hocs/withAuth.jsx)
- Render-prop toggle component: [app/components/Toggle.jsx](app/components/Toggle.jsx)
- Product detail client view: [app/components/ProductDetailClient.jsx](app/components/ProductDetailClient.jsx)

## Features covered

- Firebase sign up and login flows
- Redux Toolkit cart and wishlist state
- Responsive e-commerce UI
- Auth-protected cart, wishlist, and account dropdown flows
- Product details page with loading, error, and not-found states

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```
