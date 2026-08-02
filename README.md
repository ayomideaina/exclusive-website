# Exclusive — E-Commerce Website (Next.js)

Rebuilt from the Stage 6 (exclusive) React/Vite implementation into a Next.js App Router
application. This README documents the rendering strategy chosen for each
screen, and where the required custom hooks, HOC, and render prop component
live in the codebase.


## Getting Started

```bash
pnpm install
pnpm dev
```

## Rendering Strategy Per Screen

Every screen uses a deliberate rendering strategy rather than an accidental default.

| Screen | Strategy | Reasoning |
|---|---|---|
| **HomePage** | **ISR** (`revalidate = 60`) | `Home` is an `async` Server Component that calls `getProducts()` (wrapped in `unstable_cache`, `revalidate: 60`) once per request/revalidation window, then distributes filtered product lists as props to section components. Mostly static content, benefits from speed and SEO indexability, with a periodic refresh window so new/updated products surface without a full redeploy. |
| **Product Details** | **ISR** (`revalidate = 60`) | Also an `async` Server Component. Calls `getProductById(id)` (cached, `revalidate: 60`) server-side and calls Next's `notFound()` if no match — this satisfies the "invalid product id" requirement via the framework convention rather than a manual `if (!product)` UI branch. All interactive pieces (quantity stepper, color/size selection, add-to-cart/wishlist) are isolated into a client component that receives the fetched product as a prop. |
| **Sign Up / Log In** | **SSG shell + client auth** | Both pages are `"use client"` because the form itself needs local state (`useForm`) and to call Firebase (`useAuth`) on submit — but no data fetching happens at render time, and the JSX shell is otherwise static. Firebase calls only fire inside the `onSubmit` handler, never during render, keeping the actual page shell effectively static from Next.js's build perspective. |
| **Cart** | **CSR** | Wrapped in `withAuth`. Reads exclusively from Redux (`state.cart.items`) — it's gated behind login. |
| **Wishlist** | **CSR** | also reads from Redux (`state.wishlist.items`), personalized, behind login. |
| **Account (dropdown)** | **CSR** | Wrapped in `withAuth` with `fallback: null`, so it renders nothing for logged-out users instead of redirecting (since it lives inside the global header, not a standalone route). |
| **404 (global)** | **Static** (`not-found.jsx`) | Built-in Next.js convention. Triggers for any URL that doesn't match a route at all. |
| **404 (invalid product id)** | **Static** (`not-found.jsx`) |more specific convention file — triggers when `/product/[id]` matches as a route pattern but `getProductById(id)` returns null. Distinct from the global 404: this is a valid route with invalid *data*, not an invalid route. |

### Loading & Error States

- **`loading.jsx`** implemented for both HomePage and Product Details routes —
  shown while their respective `async` Server Components resolve their fetch.
- **`error.jsx`** implemented for Product Details specifically, catching a
  failed product fetch and offering a "Try Again" button wired to `reset()`.
  A root-level `error.jsx` also exists as a general fallback for any
  unhandled error outside a more specific segment.
- **`not-found.jsx`** implemented for an invalid product id (via an explicit
  `notFound()` call after `getProductById(id)` returns null), and separately
  at the root for any unmatched URL — satisfying the requirement to not rely
  on a generic thrown error for the invalid-id case.

## Advanced Patterns

### Custom Hooks

- **`useAuth`** — Wraps all Firebase Authentication logic. Returns
  `{ user, signUp, logIn, logOut, loading, error }`. Consumed
  identically by both the Sign Up and Log In pages.
- **`useForm`** — Shared form-state/validation hook. Consumed by both the
  Sign Up and Log In forms.

### Higher-Order Component

- **`withAuth(Component, options)`** — Checks `useAuth()`'s `user`/`loading`
  state and either renders the wrapped component (forwarding all props via
  `{...props}`), redirects to `/login` (via `next/navigation`'s `useRouter`),
  or renders a `fallback` (used for the Account Dropdown, which should render
  nothing rather than redirect since it lives inside the global header).
  Applied to Cart, Wishlist, Product Details, and the Account Dropdown.

### Render Prop Component

- **`<Toggle>`** — Generic open/closed state manager exposed via a `render`
  prop: `<Toggle render={(open, toggle) => (...)} />`. Reused in two
  independent pieces of UI:
  - The wishlist heart icon's filled/unfilled toggle state on product cards.
  - The Account Dropdown's open/closed state.

