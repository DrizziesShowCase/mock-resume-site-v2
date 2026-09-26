# PRD — Mock Résumé-Writing Service Site (v1)

| | |
|---|---|
| **Status** | Draft v1 — 2026-09-25 |
| **Owner** | TCrisp1 |
| **Type** | Portfolio / practice project (not a real business) |
| **Stack** | React + Vite, plain CSS, static deploy to GitHub Pages |
| **Source brief** | [`reference/resumespice-site-structure.md`](reference/resumespice-site-structure.md) |

---

## 1. Summary

Build a polished, corporate marketing site for a **fictional** résumé-writing
service, modeled on the structure of resumespice.com (see the source brief) but
with its own brand, content, and a deliberate design system. The centerpiece is
a **multi-step order configurator** that ends in a mock confirmation. No payment
data is collected and no orders are real.

The project exists to show three things in a portfolio:
1. Clean information architecture that fixes the reference site's problems (inconsistent slugs, content repeated 2–3× in markup).
2. A data-driven React component system: content lives in `src/data/`, and components only render it.
3. Design craft: a design system built for this domain, not a generic template.

## 2. Goals & Non-Goals

### Goals
- **G1.** Ship 5 core pages (§5) as a working, responsive static site on GitHub Pages.
- **G2.** A stateful order configurator: tier (single-select) + add-ons (multi-select) → running total → review → mock confirmation.
- **G3.** Every piece of repeated content (tiers, add-ons, testimonials, nav, FAQ, process steps) comes from one source in `src/data/`.
- **G4.** WCAG 2.2 AA: keyboard-operable mega menu, tabs, accordion, and configurator.
- **G5.** Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, and SEO on Home and Pricing (desktop).

### Non-Goals (v1)
- Real checkout, payment processing, accounts, or a backend of any kind.
- Real client logos, press logos, or testimonials. All social proof is visibly sample content.
- Analytics/tracking pixels, and cookie consent (nothing to consent to without trackers; see §11).
- Blog, sample-résumé library, city recruiter directory, team, press, and individual service pages (planned in Phase 2, §12).
- Dark mode (light mode builds trust for this domain; tokens are structured so it can be added later).

## 3. Brand (fictional)

**Name: Shortlist Résumé Co.** ("Shortlist" for short), where the name is the
outcome the customer is buying: getting shortlisted. *(Confirmed 2026-09-26.)*

- **Tagline (draft):** "Get on the shortlist."
- **Guarantee (fictional equivalent of the 60-day guarantee):** the "Shortlist Guarantee": interviews within 60 days, or a free rewrite.
- **Disclaimer:** the footer on every page reads *"Portfolio demo. Shortlist Résumé Co. is a fictional company. No orders are processed."*
- **Social-proof content:** testimonials use invented names and are labeled "Sample testimonial". The "clients landed at" and "as seen in" strips use invented, generic-looking wordmarks (e.g. *Northwind Health*, *Halcyon Capital*) rendered as text/SVG, never real company logos.

## 4. Users

These are the people the *fictional business* serves. The design has to work for them.

| Persona | Situation | What they must do | What they need to feel |
|---|---|---|---|
| **Maya, mid-career switcher** (8 yrs experience) | Laptop at night after work, has 4 tabs open comparing services | Decide which tier fits her, see the total, trust the company | "These people are serious professionals, and I can see exactly what I'm paying for." |
| **Daniel, new grad** | On his phone between classes | Understand the entry-level offer and the price quickly | "This isn't only for executives. It's affordable and clear." |
| **Priya, VP-level exec** | Short on time, skeptical of templated résumé mills | Find the executive tier and proof of expertise, then order or call | "Discreet, senior, worth the money." |

The *portfolio* audience (recruiters and hiring managers reviewing the project)
will look at the code quality, the README/docs, and how the configurator feels.

## 5. Scope & Information Architecture

### 5.1 v1 pages

| # | Page | Route | Mirrors reference template |
|---|---|---|---|
| 1 | Home | `/` | §3.1 Homepage |
| 2 | Pricing / Order | `/pricing` → `/pricing/review` → `/pricing/confirmation` | §3.2 Pricing configurator (+ new review/confirm steps) |
| 3 | Why Shortlist | `/why-us` | §3.3 Long-form + comparison table |
| 4 | Our Process | `/process` | §3.4 Tabbed step list |
| 5 | FAQ & Contact | `/faq` | §3.5 FAQ accordion + contact form (inferred) |
| — | 404 | `*` | new |

**Routing:** `react-router-dom` with `HashRouter`. GitHub Pages has no SPA
rewrite, and a hash router avoids the `404.html` redirect workaround. The
tradeoff (`/#/pricing` URLs) is acceptable for a demo. If clean URLs become
important later, switch to `BrowserRouter` plus the 404 redirect trick.

### 5.2 Navigation

The reference site has 6 mega-menu categories with ~30 links. v1 uses **5
top-level items**, which stays within Hick's/Miller's limits. Only *Services*
opens a mega menu in v1.

```
[Shortlist logo]   Services ▾   Our Process   Why Shortlist   Pricing   FAQ      (555) 010-0199   [Get started →]
```

- **Services mega menu:** 3 columns of real v1 content: *Résumés* (3 tiers → deep-link to `/pricing?tier=`), *Add-ons* (5 items → deep-link to `/pricing?addon=`), *Not sure?* (link to Process + "Talk to a writer" phone CTA). Phase-2 service pages will replace the deep links.
- **Phone CTA:** a `tel:` link using a 555-01xx fictional number. On mobile it becomes a sticky bottom bar ("Call a writer" | "Get started"), which puts the primary action in thumb reach (Fitts's law).
- **Get started:** the only filled button in the header. Always routes to `/pricing`.
- **Mobile (< 960px):** a hamburger opens a full-height sheet, with Services as a disclosure (accordion), not a hover menu.
- **Nav data** lives in `src/data/nav.js`. Header, mobile sheet, and footer all read from it.

### 5.3 Footer
A 4-column link grid (Services / Process / Company / Help), the fictional
guarantee seal, a contact email (`hello@shortlist.example`), the portfolio
disclaimer, and © year. Social icons are omitted in v1 (there is nothing real to link to).

## 6. Page Requirements

Each page lists sections in order. **Bold** sections are must-have for v1.
*Italic* sections are nice-to-have.

### 6.1 Home (`/`)
1. **Hero:** H1 value proposition, 1-line subhead, primary CTA "Build your order →" (→ `/pricing`), secondary ghost CTA "See how it works" (→ `/process`). Next to the text is a **stylized résumé sheet** illustration (CSS/SVG, not a stock photo) with redline edit marks animating in once on load. This is the signature element's first appearance (§7.3).
2. **Proof bar:** aggregate rating (e.g. "4.9 / 5 from 1,200+ clients", labeled as sample data) + guarantee chip + "Certified writers" chip. One row only; the reference site repeats trust badges 3×, and we won't.
3. **Tier preview:** 3 tier cards from `tiers.js`, with **Professional** featured (larger, ink background). Each card shows who it's for, the price, the 3 key inclusions, "See everything included" (expands the full list), and a CTA deep-linking into the configurator with that tier preselected.
4. **Testimonials:** 3 visible quote cards from `testimonials.js` (bolded pull-phrase + name + role). *Carousel with more is optional.* No auto-rotation (accessibility).
5. **Guarantee callout:** seal + heading + 2 lines + link to `/why-us#guarantee`.
6. **Add-on services:** 4-up cards (Cover Letter, LinkedIn, Interview Prep, Career Coaching): icon + title + 1-liner + "Add to order →".
7. **"Clients landed at" strip:** 6–8 fictional wordmarks, grayscale, with a clear label so it can't be mistaken for press.
8. **Closing CTA band:** "Get on the shortlist." + primary CTA + phone.

The reference homepage's long "Why choose us" bullet section is dropped here.
That content lives on `/why-us` to avoid duplication.

### 6.2 Pricing / Order (`/pricing`)
This is the heart of the project. It is a 3-step flow on one page, followed by
review and confirmation routes.

**Layout (desktop ≥ 1024px):** two columns. The steps are on the left (~2/3).
On the right (~1/3), a sticky **Order Sheet** (§7.3) updates live.
**Mobile:** the steps stack. The Order Sheet collapses into a sticky bottom
summary bar ("3 items · $967 · Review ▴") that expands into a bottom sheet.

**Step 1: Choose your résumé** (required, single-select)
- 3 tier cards as a **radio group** (`role="radiogroup"`, arrow-key navigable).
- Each shows the tier name, who it's for ("0–5 years", "5–15 years", "15+ years / exec"), the price, and the full inclusion list.
- Because the reference site's tiers differ *only* by eligibility and price, we make that honest and visible: a shared "Every tier includes" list sits above the cards, and each card shows only what differs (eligibility, writer seniority, turnaround).
- Preselected from `?tier=` if present. Otherwise nothing is selected, and the "Review order" button is disabled with the helper text "Choose a résumé tier to continue."

**Step 2: Add services** (optional, multi-select)
- 5 compact add-on cards as a **checkbox group**: Cover Letter, LinkedIn Profile, Interview Prep, Professional Bio, Thank-You Letter.
- **Dependency rule** (from the reference site): LinkedIn requires a résumé tier. If LinkedIn is checked without a tier, show an inline note: "LinkedIn is written from your new résumé. Pick a tier above." Never silently uncheck.

**Step 3: Review & continue**
- "Review order →" routes to `/pricing/review`. The selection is kept in React state + `sessionStorage`, so refresh and back navigation never lose data.

**`/pricing/review`**
- Full order summary (line items and total), "Edit" links back to each step, and a short **mock details form** (name, email, current job title, target role) with inline on-blur validation. There are **no payment fields.**
- Primary button: "Place demo order". A visible note says: "This is a portfolio demo. No payment is taken and nothing is sent."

**`/pricing/confirmation`**
- Order number (generated client-side, e.g. `SL-2026-4F7K`), a summary, and a "What happens next" 4-step timeline (reusing the Process data), plus "Start over". Clears `sessionStorage`.
- Visiting it directly with no order redirects to `/pricing`.

### 6.3 Why Shortlist (`/why-us`)
1. **H1 + intro paragraph.**
2. **Value-prop grid:** 6 items (Results, Personal writer, Industry experts, One-stop, Fast turnaround, Guaranteed): icon + title + 1-liner.
3. **Comparison table:** Shortlist vs. "Typical résumé mills", 8 rows from `comparison.js`. Accessible `<table>` with a caption. On mobile it becomes stacked row cards.
4. **Guarantee section** (`#guarantee`): the full terms in plain language.
5. *Newsletter signup (optional):* first name + email, mock submit with a success state. It goes at the end of the page, not mid-page as on the reference site.
6. **Closing CTA band.**

### 6.4 Our Process (`/process`)
1. **H1 + intro.**
2. **Tabbed step lists:** 5 tabs (Résumés / Cover Letters / LinkedIn / Interview Prep / Career Coaching), using the WAI-ARIA tabs pattern with arrow keys. Each tab shows 4–7 numbered steps from `process.js`. Steps render as a vertical **timeline** (continuity principle), not a plain `<ol>` with bullets.
3. The tab can be deep-linked via `?tab=linkedin`.
4. **Closing CTA:** phone + "Build your order →".

### 6.5 FAQ & Contact (`/faq`)
1. **H1.**
2. **FAQ accordion:** ~10 Q&As from `faq.js`, grouped (Ordering / Process / Guarantee). Uses the native `<details>`/`<summary>` element, styled.
3. **Contact block:** a mock form (name, email, topic select, message) with validation + success state, plus phone, email, and hours.

### 6.6 404
A "This page didn't make the shortlist." message + links home and to pricing.

## 7. Design System: "The Hiring Desk"

### 7.1 Intent
- **Who:** someone in the middle of a job search. They are anxious, comparing options, and often reading at night or on a phone. They are about to spend $450–$1,000 on something personal.
- **What they must do:** understand what they get, pick the right tier, see the total, and trust us enough to order.
- **Feel:** *a senior recruiter's desk.* Quiet, orderly, expensive paper, a pen that means business. Calm confidence, not salesy urgency. There are no countdown timers, no strikethrough prices, and no flashing badges.

### 7.2 Domain exploration
- **Domain concepts:** résumé paper, redline edits, the shortlist, the offer letter, the interview calendar, the recruiter's desk, letterhead, the signature line.
- **Color world:** heavy off-white résumé stock · the deep ink navy of a signed offer letter · graphite pencil gray · a correction-pen red · brass nameplate · pale blue-lined notepad.
- **Signature element:** **the Order Sheet.** The configurator summary is styled as a résumé being assembled: a paper sheet with a letterhead ("Order for: —"), sections with small-caps headings, dotted leaders between line items and prices (like a résumé's date column), and a brief redline "✓ added" mark when an item is added.
- **Defaults rejected:**
  - Generic SaaS blue + purple gradient → ink navy on résumé-paper neutrals.
  - Floating glassmorphic pill navbar → a flat, letterhead-like header with a hairline rule.
  - Three identical pricing cards → one featured tier + an honest "what's the same / what differs" structure.
  - Stock photo of smiling person in suit → a typographic hero with an illustrated résumé sheet.

### 7.3 Where the signature shows up (signature test)
1. The Home hero résumé illustration with redline marks.
2. The Order Sheet on `/pricing` (dotted leaders, letterhead, small-caps sections).
3. The confirmation page, rendered as a finished "offer letter" with a signature line.
4. Section eyebrows styled as résumé section headings (small caps + hairline rule), e.g. `EXPERIENCE ——` becomes `HOW IT WORKS ——`.
5. The Process timeline, whose markers look like résumé date bullets.

### 7.4 Tokens
Tokens are named for the domain. Semantic aliases sit on top so components
stay readable. Values are oklch; contrast must be verified with the skill's
contrast script before build.

```css
:root {
  /* Primitives — the desk */
  --paper:        oklch(0.985 0.006 85);   /* résumé stock — page canvas */
  --paper-bright: oklch(1 0 0);            /* fresh sheet — cards, order sheet */
  --paper-shade:  oklch(0.955 0.008 85);   /* sheet underneath — inset inputs, alt sections */
  --ink:          oklch(0.24 0.055 258);   /* offer-letter navy — primary text, brand, featured tier */
  --ink-soft:     oklch(0.33 0.05 258);    /* hover on ink surfaces */
  --graphite:     oklch(0.45 0.012 258);   /* secondary text */
  --pencil:       oklch(0.58 0.01 258);    /* tertiary / metadata (large text only) */
  --rule:         oklch(0.24 0.055 258 / 0.12); /* hairlines, dividers */
  --redline:      oklch(0.53 0.19 28);     /* edit marks, errors — never decorative fills */
  --brass:        oklch(0.72 0.1 80);      /* guarantee seal, featured badge — on ink only, never text on paper */
  --notepad:      oklch(0.95 0.025 245);   /* info callouts, selected-card tint */

  /* Semantic */
  --text-primary:   var(--ink);
  --text-secondary: var(--graphite);
  --text-tertiary:  var(--pencil);
  --surface-page:   var(--paper);
  --surface-card:   var(--paper-bright);
  --surface-inset:  var(--paper-shade);
  --accent:         var(--ink);
  --accent-contrast: var(--paper-bright);
  --focus-ring:     oklch(0.55 0.15 250);
  --danger:         var(--redline);
  --success:        oklch(0.52 0.12 155);

  /* Depth — paper on a desk: one soft shadow family */
  --lift-1: 0 1px 2px oklch(0.24 0.05 258 / 0.06);                                  /* card at rest */
  --lift-2: 0 2px 6px oklch(0.24 0.05 258 / 0.07), 0 1px 2px oklch(0.24 0.05 258 / 0.05); /* hover, order sheet */
  --lift-3: 0 12px 32px oklch(0.24 0.05 258 / 0.12);                                  /* mega menu, mobile sheet */

  /* Radius — paper corners are nearly square */
  --corner-sm: 3px;  --corner-md: 6px;  --corner-pill: 999px;

  /* Spacing — 4px base */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* Motion */
  --ease-settle: cubic-bezier(0.2, 0, 0, 1);
  --dur-quick: 150ms; --dur-open: 220ms;
}
```

### 7.5 Typography
- **Headings: Source Serif 4** (variable, Google Fonts). A serif evokes letterhead and printed documents, the literal product being sold. Semibold at 600, tight tracking (−0.02em) at display sizes.
- **Body/UI: Public Sans** (variable). A neutral, highly legible, institutional sans. It reads "trustworthy" without being the default Inter.
- **Prices & order numbers:** Public Sans with `font-variant-numeric: tabular-nums` so the Order Sheet columns line up.
- **Scale:** Major Third (1.25) on a 16px body. Fluid display sizes use `clamp()`, e.g. hero `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)`.
- **Handwriting: Caveat 600**, only for the red-pen notes in the hero illustration and the signature on the confirmation letter.
- **Eyebrows:** Public Sans 600, 12px, `letter-spacing: 0.08em`, small caps, followed by a hairline rule (signature item 4).
- **Line length:** body copy is capped at ~68ch.

### 7.6 Layout & depth
- 12-column grid, 1200px max content width, 24px gutters on desktop / 16px on mobile.
- Section rhythm alternates `--surface-page` and `--surface-inset` bands. Hierarchy comes from surface shifts plus **one** shadow family (`--lift-*`). There are no heavy borders anywhere.
- **Featured tier** inverts to an ink surface with paper text and a brass "Most chosen" tab. It is the only dark surface above the footer (Von Restorff effect).
- The **footer** is ink, like the bottom of the letterhead.

### 7.7 Components & states
Every interactive component needs default / hover / focus-visible / active /
disabled states. Every form needs empty / invalid / valid / submitting / success states.

| Component | Key behavior / states |
|---|---|
| `SiteHeader` + `MegaMenu` | Opens on click and on hover with a 150ms intent delay. Esc closes and returns focus. The header gains `--lift-1` after 8px of scroll. |
| `MobileNav` | Full-height sheet, focus trap, Services disclosure. |
| `Button` | Primary (ink), secondary (outlined ink), ghost. 44px minimum height. Primary carries a → arrow. |
| `TierCard` | Display variant (Home) and selectable radio variant (Pricing). Selected = ink 2px outline + notepad tint + check. Featured variant. |
| `AddonCard` | Checkbox variant, plus a dependency-note state. |
| `OrderSheet` | Empty ("Your order will appear here"), filled, animated total (number tween ≤ 300ms, instant under reduced motion). Live region announces "Total $1,048". |
| `TestimonialCard` | Quote with a bolded pull-phrase, name, role, "Sample" label. |
| `LogoStrip` | Two variants: `clients` / `press`, each with a visible label. |
| `ValuePropGrid` | Icon + title + 1-liner, 3×2 → 1-col. |
| `ComparisonTable` | Semantic table → stacked cards on mobile. |
| `TabbedSteps` | ARIA tabs, arrow/Home/End keys, deep-linkable. |
| `Timeline` | Numbered résumé-bullet markers. |
| `FaqAccordion` | `<details>`, grouped. |
| `FormField` | Label above, on-blur validation, error text in redline + icon (never color alone). |
| `GuaranteeSeal` | Brass-on-ink SVG seal. |
| `CtaBand` | Closing call to action + phone. |
| `ProofBar` | Rating + chips. |

**Icons:** Lucide (`lucide-react`) at 1.5px stroke, matching the fine-pen feel.

### 7.8 Motion
Restrained, like paper settling.
- Hover/press: 150ms.
- Menus: 220ms, fade + 4px drop.
- Hero redline marks draw once (SVG stroke) on load.
- Order Sheet line items slide in 8px.
- No scroll-jacking, parallax, or auto-rotating carousels.
- `prefers-reduced-motion`: everything becomes an opacity-only or instant change.

## 8. Content & Data Model (`src/data/`)

| File | Shape (abridged) | Used by |
|---|---|---|
| `tiers.js` | `{ id, name, audience, price, featured, differs: [..] }` + `sharedInclusions: [..]` | Home, Pricing, MegaMenu |
| `addons.js` | `{ id, name, price, blurb, bullets, requires?: 'tier' }` | Home, Pricing, MegaMenu |
| `testimonials.js` | `{ id, quote, highlight, name, role, isSample: true }` | Home, Pricing |
| `nav.js` | Header groups, footer columns, phone, email | Header, MobileNav, Footer |
| `valueProps.js` | `{ id, icon, title, text }` | Why Us |
| `comparison.js` | `{ feature, us, them }` | Why Us |
| `process.js` | `{ tabId, label, steps: [{ title, text, link? }] }` | Process, Confirmation |
| `faq.js` | `{ group, q, a }` | FAQ |
| `logos.js` | `{ variant: 'clients' \| 'press', name }` | Home |
| `site.js` | Brand name, tagline, guarantee text, disclaimer | Global |

**Draft pricing (fictional):**
- **Tiers:** Early Career $449 · Professional $569 · Executive $689.
- **Add-ons:** Cover Letter $179 · LinkedIn $189 · Interview Prep $169 · Professional Bio $179 · Thank-You Letter $99.

**Order state** is a `useReducer` in an `OrderProvider` context (`selectTier`,
`toggleAddon`, `setDetails`, `reset`), persisted to `sessionStorage`. The total
is *derived* from state and never stored.

## 9. Accessibility Requirements
- WCAG 2.2 AA contrast. `--pencil` and `--brass` are restricted as noted in §7.4.
- A skip link comes first. There is one H1 per page, headings are sequential, and landmarks are used throughout.
- Mega menu, tabs, radio group, accordion, and mobile nav are fully keyboard-operable, following the WAI-ARIA APG patterns.
- Focus-visible ring on every focusable element: 2px `--focus-ring`, 2px offset.
- Order total changes are announced through `aria-live="polite"`. Form errors are linked with `aria-describedby`.
- Touch targets are ≥ 44×44px.
- Reduced-motion and forced-colors modes are respected.

## 10. Technical Requirements
- **Dependencies:** React 19 + Vite 8 (already scaffolded), plus `react-router-dom` and `lucide-react`. No UI library. CSS is plain, organized as `tokens.css`, `base.css`, and per-component CSS files, with `@layer tokens, base, components, utilities`.
- **Fonts:** self-host via `@fontsource-variable/source-serif-4` and `@fontsource-variable/public-sans`, subset to Latin, `font-display: swap`.
- **SEO:** per-route `<title>` and meta description with a `| Shortlist` suffix, set with React 19's native `<title>`/`<meta>` hoisting. Open Graph image.
- **Deploy:** `base: './'` in `vite.config.js` (relative assets work under any repo name because HashRouter serves every page from `index.html`) and `.github/workflows/deploy.yml` (lint → build → `actions/deploy-pages`).
- **Quality:** `oxlint` is clean. There are component tests for the order reducer (Vitest) at minimum.

## 11. Decisions Log

| Date | Decision | Why |
|---|---|---|
| 2026-09-25 | Fictional brand, sample social proof, no real logos | The site is public on GitHub Pages. Using a real company's name or logos would read as impersonation. |
| 2026-09-25 | v1 = 5 core pages | Shows every key template from the brief without building ~30 pages. |
| 2026-09-25 | Checkout ends in mock review → confirmation, with no payment fields | Shows the full stateful flow without collecting anything sensitive. |
| 2026-09-25 | "Hiring Desk" design direction | Domain-derived, corporate, and distinct from a generic SaaS template. |
| 2026-09-25 | No cookie banner in v1 | There are no cookies or trackers, so there is nothing to consent to. Adding one would be theater. |
| 2026-09-25 | `HashRouter` | GitHub Pages lacks SPA rewrites. This is the simplest correct option. |
| 2026-09-26 | Name confirmed: Shortlist Résumé Co. | Chosen from the proposed options. |
| 2026-09-26 | No bundle discount in v1 | Keeps pricing simple: total = tier + add-ons. |
| 2026-09-26 | Mockup approved; M0 built | Direction validated before building. |
| 2026-09-26 | `base: './'` instead of a repo-name base | Removes the dependency on the repo name. |
| 2026-09-26 | Hamburger below 960px, not 768px | Five nav items + CTA don't fit comfortably at tablet width. |
| 2026-09-26 | M1: tier cards show only what differs, no "see everything" expander | The shared inclusions strip above the cards already lists the rest (matches the approved mockup). |
| 2026-09-26 | M1: Home add-on teasers are Cover Letter, LinkedIn, Interview Prep, Professional Bio | Career Coaching isn't an orderable add-on in v1; every teaser deep-links into the configurator. |
| 2026-09-26 | Caveat (handwriting) used only for the hero illustration's red-pen notes and the confirmation letter's signature | Sells the redline/letter signature; never used for UI text. |
| 2026-09-26 | M2: a placed order persists until "Start a new order" (or the next visit to /pricing), not cleared on the confirmation view | Refreshing the confirmation page keeps working. |
| 2026-09-26 | M2: order bar + bottom sheet below 1024px (not only phones) | The sidebar sheet needs ~380px beside the steps. |
| 2026-09-26 | M2: option cards are `<label>`s around real radio/checkbox inputs | Native arrow-key and Space behavior, with no custom ARIA widget to maintain. |

## 12. Milestones

| Phase | Deliverable |
|---|---|
| **M0 Foundations** | Router, `tokens.css`/`base.css`, fonts, `SiteHeader`/`MobileNav`/`Footer`, all `src/data/` files, deploy workflow live with a placeholder Home. |
| **M1 Home** | All Home sections + shared cards (Tier, Testimonial, LogoStrip, CtaBand, GuaranteeSeal). |
| **M2 Order flow** | `OrderProvider`, Pricing steps, OrderSheet, review, confirmation, reducer tests. |
| **M3 Content pages** | Why Us, Process, FAQ & Contact, 404. |
| **M4 Polish** | Motion pass, a11y audit (skill audit script + manual keyboard/screen-reader pass), Lighthouse, README with screenshots. |
| **Phase 2 (later)** | Individual service pages, a `/resources/recruiters/:city` programmatic route, blog/sample résumés, team/about, optional dark mode. |

## 13. Acceptance Criteria (v1 done when…)
- [ ] All 5 pages + 404 are reachable from the nav on the deployed GitHub Pages URL.
- [ ] Choosing a tier and 2 add-ons on mobile and desktop shows the correct total. Refresh keeps it. Review → confirmation shows an order number, and "Start over" clears it.
- [ ] LinkedIn-without-tier shows the dependency note. "Review" is disabled until a tier is chosen.
- [ ] Deep links `?tier=`, `?addon=`, and `?tab=` preselect correctly.
- [ ] No tier/add-on/testimonial text is duplicated in JSX. A grep for prices in `src/pages` and `src/components` finds nothing.
- [ ] The entire order flow can be completed by keyboard alone. axe reports 0 serious/critical issues.
- [ ] Lighthouse ≥ 95 in all four categories on Home and Pricing (desktop).
- [ ] The portfolio disclaimer is visible in the footer of every page.

## 14. Open Questions
None open. The repo name no longer blocks deploy (`base: './'`); it's only needed when the GitHub repo is created.
