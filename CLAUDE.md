# Mock Resume Site v2 — Project Map

Corporate/professional mock rebuild of a ResumeSpice-style resume-writing business
site. Built as a practice/portfolio project — not a real business, no real
checkout/payment processing. Deployed as a static site to GitHub Pages.

**Stack:** React + Vite. Plain CSS for now (no component library chosen yet).
**Status:** Scaffold only — default Vite starter files still in place under
`src/`. No real pages/components built yet. See "Next steps" below.

## Where things are

| Path | What's there |
|---|---|
| `docs/reference/resumespice-site-structure.md` | Source-of-truth crawl notes on the real resumespice.com — page templates, nav structure, component list, rebuild recommendations. Read this before building any page or component. |
| `docs/PRD.md` | **v1 product spec** — scope, fictional brand (Shortlist Résumé Co.), page requirements, design system tokens, data model, milestones. Build against this. |
| `docs/` | Project-level planning docs (see `docs/README.md`). |
| `src/pages/` | One file per route/page (Home, Pricing, WhyUs, Process, etc.). Not yet populated — see `src/pages/README.md`. |
| `src/components/` | Reusable UI pieces (PricingCard, TestimonialCard, LogoStrip, etc. — full list in `docs/reference/resumespice-site-structure.md` §4). Not yet populated — see `src/components/README.md`. |
| `src/data/` | Structured content (pricing tiers, testimonials, nav config) as JSON/JS, kept separate from markup per the rebuild doc's recommendation. Not yet populated — see `src/data/README.md`. |
| `src/App.jsx`, `src/main.jsx` | Current default Vite starter entry points — will be replaced once routing/pages are built. |
| `public/` | Static assets served as-is (favicon, etc.). |

## Next steps (not done yet — for whenever the full build starts)

1. Add `react-router-dom` (or similar) and wire up routes in `src/pages/`.
2. Build components in `src/components/` per the list in the reference doc.
3. Move pricing/testimonial/nav content into `src/data/`.
4. Set `base` in `vite.config.js` to the GitHub repo name once one exists, and add
   a `.github/workflows/deploy.yml` for GitHub Pages deployment.
5. Replace the default Vite starter markup in `App.jsx`/`main.jsx`.

## Conventions

- Keep content (copy, prices, testimonials) in `src/data/`, not hardcoded in JSX —
  the real site repeats the same content 2-3x across pages; don't repeat that mistake.
- Each folder with non-obvious contents gets its own short `README.md` explaining
  *why* it exists, not just what's in it (that part is visible from the file list).
