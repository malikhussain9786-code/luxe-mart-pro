# Luxe Mart Pro

A premium, full-stack e-commerce demo platform — fashion, footwear, accessories, sport,
and fine grocery, across 8 demo brands, 207 products, shipping to all 195 countries,
with a fully simulated checkout.

Built with React 19 + Vite + Tailwind CSS. Portfolio project for Malik Hussain, BSSE,
Foundation University Islamabad.

## Highlights

- **Design system**: navy/gold premium palette with amethyst, emerald, and ruby accents;
  Fraunces/Manrope/IBM Plex Mono typography; a custom monogram logo
- **8 demo brands** × **6 categories** × **207 products** — 178 use verified real,
  category-matched photos; the remaining ones use clean labeled icon cards, never
  broken or mismatched images
- **Normal multi-brand cart**, persisted to `localStorage`, with a quick-add button
  on every product card and a visible "Added to cart" confirmation
- **195-country / real-city cascading address selector**, used at checkout, registration,
  and in the saved-addresses profile tab
- **Simulated payment system** (card / wallet / COD) with a live card preview
- **Real order lifecycle**: placement → localStorage-persisted history → status
  tracking timeline → receipts you can view, print, or download as PDF (jsPDF)
- **Reviews with real verified-purchase detection** against actual order history
- **Brand storefronts**: each brand has a shoppable, filterable storefront plus a
  separate **Brand Insights** page with simulated 12-month revenue and sales charts
- **Full admin console**: dashboard, products, inventory, orders, customers, analytics
  (Recharts), reachable from the account menu or `/admin`
- **Persistent quick-access sidebar** (desktop) alongside the top nav for one-click
  access to Home, Shop, Brands, Search, Wishlist, Cart, and Account
- **Fully responsive**, with a mobile nav drawer for both storefront and admin
- **Route-level code splitting** for a lean initial bundle

## Run locally

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

> This is a Vite + React app — it needs the dev server running. Don't open
> `index.html` directly by double-clicking it; that will show a blank page.

## Build

```
npm run build
npm run preview
```

## Testing

See `TESTING.md` for the full QA writeup, including the Playwright E2E suite
(`tests/`) and a note on this build environment's network restrictions.

## Project structure

```
src/
  components/   ui primitives, layout, product, cart, checkout, profile, admin, home
  pages/        customer, brand, admin route pages
  context/      Cart, Wishlist, Auth/Profile, Order, Review (all localStorage-persisted)
  data/         categories, brands, products (generated catalog), countries, demoReviews
  hooks/        useProductFilters (shared filter/sort/pagination engine)
  routes/       AppRoutes.jsx (lazy-loaded route map)
  utils/        generateReceiptPdf.js
```

## Disclaimer

This is a portfolio demo. No real payments are processed and no real orders are fulfilled.
