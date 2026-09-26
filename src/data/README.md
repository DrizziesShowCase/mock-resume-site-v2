# src/data/

All site content — prices, copy, testimonials, navigation — lives here as plain
JS modules, never hardcoded in JSX. The real resumespice.com repeats the same
pricing and bullet copy 2–3× across pages; keeping one source here means a price
change is a one-line edit.

| File | Used for |
|---|---|
| `site.js` | Brand name, phone, email, guarantee, portfolio disclaimer |
| `tiers.js` | Résumé tiers + the inclusions every tier shares |
| `addons.js` | Optional services; `requires: 'tier'` marks add-ons that need a résumé |
| `nav.js` | Header, Services mega menu and footer links (the menu is derived from tiers/add-ons) |
| `testimonials.js` | Sample testimonials (`highlight` must be a substring of `quote`) |
| `valueProps.js`, `comparison.js` | Why Us page |
| `process.js` | Process tabs; résumé steps are reused on the order confirmation |
| `faq.js` | FAQ accordion groups |
| `logos.js` | Invented wordmarks for the logo strips |

Everything here is fictional (docs/PRD.md §3): no real companies, people or logos.
`icon` fields are `lucide-react` export names.
