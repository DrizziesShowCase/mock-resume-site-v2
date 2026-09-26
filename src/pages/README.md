# src/pages/

One component per route, wired up in `src/App.jsx` inside the shared `Layout`.
Pages compose components and read content from `src/data/`; they shouldn't hold
copy or prices themselves.

| Route | Page | Milestone |
|---|---|---|
| `/` | `Home` | done (M1) |
| `/pricing`, `/pricing/review`, `/pricing/confirmation` | `Pricing`, `PricingReview`, `PricingConfirmation` | done (M2) |
| `/why-us` | `WhyUs` | done (M3) |
| `/process` | `Process` | done (M3) |
| `/faq` | `Faq` | done (M3) |
| `*` | `NotFound` | done |

All v1 pages are built. `Pricing.css` holds the layout shared by the build and review pages; `PagePlaceholder` is now only used by `NotFound`.
