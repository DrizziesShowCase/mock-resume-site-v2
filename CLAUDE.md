# Mock Resume Site v2 — Project Map

Corporate/professional mock of a résumé-writing business site, modeled on the
structure of resumespice.com but branded as the fictional **Shortlist Résumé Co.**
Built as a practice/portfolio project — not a real business, no real
checkout/payment processing. Deployed as a static site to GitHub Pages.

**Stack:** React 19 + Vite, `react-router-dom` (HashRouter), `lucide-react` icons,
self-hosted fonts via Fontsource. Plain CSS with cascade layers — no component library.
**Status:** M0 (foundations), M1 (Home) and M2 (order flow) done. Why Us, Process
and FAQ are placeholders. Next is M3 (content pages). See `docs/PRD.md` §12.

## Where things are

| Path | What's there |
|---|---|
| `docs/PRD.md` | **v1 product spec** — scope, brand, page requirements, design system ("The Hiring Desk"), data model, milestones, acceptance criteria. Build against this. |
| `docs/reference/resumespice-site-structure.md` | Crawl notes on the real resumespice.com — the structural reference the PRD was derived from. |
| `src/styles/` | `tokens.css` (all design tokens), `base.css` (reset, base, utilities), `index.css` (declares layer order). |
| `src/components/` | Reusable UI + site chrome (`Layout`, `SiteHeader`, `ServicesMenu`, `MobileNav`, `SiteFooter`, `ButtonLink`, …). See `src/components/README.md`. |
| `src/order/` | Order state: pure reducer/selectors/validation in `orderState.js` (unit tested, `npm test`), `OrderProvider` (sessionStorage), `useOrder` hook. |
| `src/lib/` | Small shared helpers (`format.js` → `formatPrice`). |
| `src/pages/` | One component per route; routes are wired in `src/App.jsx`. |
| `src/data/` | All site content (tiers, add-ons, testimonials, nav, FAQ, process steps, …). See `src/data/README.md`. |
| `.github/workflows/deploy.yml` | Lint + build + deploy to GitHub Pages on push to `master`. |
| `public/` | Static assets served as-is (favicon). |

## Next steps

1. **M3 Content pages** — Why Us, Process, FAQ & Contact.
2. **M4 Polish** — motion, a11y audit, Lighthouse, README with screenshots.
3. **Deploy** — create the GitHub repo, push, and set Settings → Pages → Source to "GitHub Actions". No repo name config is needed (`base: './'`).

## Conventions

- Keep content (copy, prices, testimonials) in `src/data/`, not hardcoded in JSX —
  the real site repeats the same content 2-3x across pages; don't repeat that mistake.
- Run `npm run lint`, `npm test` and `npm run build` before committing.
- Use tokens from `src/styles/tokens.css` — no raw colors, spacing or font values in component CSS.
- Each component gets a sibling `.css` file wrapped in `@layer components { … }`.
- HashRouter: never use bare `href="#id"` for in-page anchors (it's read as a route) —
  use `<Link to="/page#id">`; `Layout` scrolls to the anchor.
- Each folder with non-obvious contents gets its own short `README.md` explaining
  *why* it exists, not just what's in it (that part is visible from the file list).
