# Mock Resume Site v2 — Project Map

Corporate/professional mock of a résumé-writing business site, modeled on the
structure of resumespice.com but branded as the fictional **Shortlist Résumé Co.**
Built as a practice/portfolio project — not a real business, no real
checkout/payment processing. Deployed as a static site to GitHub Pages.

**Stack:** React 19 + Vite, `react-router-dom` (HashRouter), `lucide-react` icons,
self-hosted fonts via Fontsource. Plain CSS with cascade layers — no component library.
**Status:** v1 complete and live at https://drizziesshowcase.github.io/mock-resume-site-v2/ (deployed by CI from `master`).
All PRD acceptance criteria met. Phase 2 ideas are in `docs/PRD.md` §12.

## Where things are

| Path | What's there |
|---|---|
| `docs/PRD.md` | **v1 product spec** — scope, brand, page requirements, design system ("The Hiring Desk"), data model, milestones, acceptance criteria. Build against this. |
| `docs/reference/resumespice-site-structure.md` | Crawl notes on the real resumespice.com — the structural reference the PRD was derived from. |
| `src/styles/` | `tokens.css` (all design tokens), `base.css` (reset, base, utilities), `index.css` (declares layer order). |
| `src/components/` | Reusable UI + site chrome (`Layout`, `SiteHeader`, `ServicesMenu`, `MobileNav`, `SiteFooter`, `ButtonLink`, …). See `src/components/README.md`. |
| `src/order/` | Order state: pure reducer/selectors/validation in `orderState.js` (unit tested, `npm test`), `OrderProvider` (sessionStorage), `useOrder` hook. |
| `src/lib/` | Small shared helpers: `format.js` (`formatPrice`), `validation.js` (email), `contactForm.js` (+ tests). |
| `src/pages/` | One component per route; routes are wired in `src/App.jsx`. |
| `src/data/` | All site content (tiers, add-ons, testimonials, nav, FAQ, process steps, …). See `src/data/README.md`. |
| `e2e/` | Playwright specs: order flow, pages/keyboard, axe on every route and state. `npm run test:e2e`. |
| `scripts/screenshots.mjs` | Regenerates `docs/screenshots/` and `public/og-image.png` (`npm run screenshots`). |
| `.github/workflows/deploy.yml` | Lint + unit + e2e on every push/PR; deploys to GitHub Pages from `master`. |
| `public/` | Static assets served as-is (favicon). |

## Next steps

1. Phase 2 ideas are listed in `docs/PRD.md` §12 (service pages, recruiter-by-city route, blog, dark mode).
2. CI warns that its actions (checkout, setup-node, upload-artifact) run on Node 20; bump them to their Node 24 majors when convenient.
3. Every push to `master` redeploys; pull requests run the checks only.

## Conventions

- Keep content (copy, prices, testimonials) in `src/data/`, not hardcoded in JSX —
  the real site repeats the same content 2-3x across pages; don't repeat that mistake.
- Run `npm run lint`, `npm test` and `npm run test:e2e` before committing (e2e builds the site itself).
- e2e uses port 4391 on purpose and never reuses a running server: port 4173 may be serving another local project.
- Use tokens from `src/styles/tokens.css` — no raw colors, spacing or font values in component CSS.
- Each component gets a sibling `.css` file wrapped in `@layer components { … }`.
- HashRouter: never use bare `href="#id"` for in-page anchors (it's read as a route) —
  use `<Link to="/page#id">`; `Layout` scrolls to the anchor.
- Each folder with non-obvious contents gets its own short `README.md` explaining
  *why* it exists, not just what's in it (that part is visible from the file list).
