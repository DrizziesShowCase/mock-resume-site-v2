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

**Page building blocks (M1, built):**
- `Section` / `SectionHeader` — page bands that alternate paper/shade, with eyebrow + heading
- `Hero` + `ResumeSheet` (the redlined résumé SVG) and `ProofBar`
- `TierCard` (display variant), `IncludedStrip`, `TestimonialCard`, `GuaranteeCallout`,
  `ServiceCard`, `LogoStrip`, `CtaBand`
- `Icon` — maps icon names from `src/data/` to lucide components

**Order flow (M2, built):**
- `TierOption` / `AddonOption` — `<label>` cards around real radio/checkbox inputs (shared styles in `OptionCard.css`)
- `OrderSheet` — the signature résumé-styled summary; exports `OrderLines` (also used by the confirmation letter)
- `OrderBar` — mobile summary bar + bottom-sheet `<dialog>`
- `FormField` — label/hint/error wiring; `Timeline` — numbered steps (confirmation now, Process page in M3)

**Content pages (M3, built):**
- `PageIntro` — eyebrow + h1 + lead for content pages
- `ValuePropGrid`, `ComparisonTable` (restacks to cards < 720px), `GuaranteeTerms` (the `#guarantee` anchor)
- `TabbedSteps` — WAI-ARIA tabs synced to `?tab=`; renders `Timeline`
- `FaqAccordion` — native `<details>`, grouped; `ContactForm` — demo form with validation + success state
- `FormField` also renders `as="select"` and `as="textarea"`
