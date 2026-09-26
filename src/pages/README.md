# src/pages/

One component per route, wired up in `src/App.jsx` inside the shared `Layout`.
Pages compose components and read content from `src/data/`; they shouldn't hold
copy or prices themselves.

| Route | Page | Milestone |
|---|---|---|
| `/` | `Home` | done (M1) |
| `/pricing`, `/pricing/review`, `/pricing/confirmation` | `Pricing`, `PricingReview`, `PricingConfirmation` | M2 |
| `/why-us` | `WhyUs` | M3 |
| `/process` | `Process` | M3 |
| `/faq` | `Faq` | M3 |
| `*` | `NotFound` | done |

Pricing, Why Us, Process and FAQ are still `PagePlaceholder`s.
