# src/data/

Structured content — pricing tiers, add-ons, testimonials, nav structure —
as plain JSON/JS modules, not hardcoded in JSX. The real resumespice.com
repeats the same pricing/bullet content 2-3x across pages; keeping it here
instead means each page imports the same source instead of duplicating copy.

Empty for now. Planned files: `pricing.js`, `addOns.js`, `testimonials.js`,
`nav.js`, per `docs/reference/resumespice-site-structure.md` §5-6.
