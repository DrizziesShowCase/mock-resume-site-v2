# src/components/

Reusable UI shared across pages. Each component has a sibling `.css` file whose
rules sit in `@layer components`, and uses only tokens from `src/styles/tokens.css`.

**Site chrome (M0, built):**
- `Layout` — skip link, header, `<main>`, footer, mobile action bar; scroll/anchor handling on navigation
- `SiteHeader` — sticky header; lifts on scroll; collapses to `MobileNav` below 960px
- `ServicesMenu` — the Services mega menu (disclosure pattern, hover intent, Esc to close)
- `MobileNav` — full-height `<dialog>` menu for small screens
- `SiteFooter` — ink footer with link columns, guarantee and disclaimer
- `Logo`, `GuaranteeSeal`, `Eyebrow` (résumé-style section label), `ButtonLink`
- `PageMeta` — per-route `<title>`/description; `PagePlaceholder` — stand-in for unbuilt pages

**Planned** (docs/PRD.md §7.7): `TierCard`, `AddonCard`, `OrderSheet`,
`TestimonialCard`, `LogoStrip`, `ValuePropGrid`, `ComparisonTable`,
`TabbedSteps`, `Timeline`, `FaqAccordion`, `FormField`, `CtaBand`, `ProofBar`.
