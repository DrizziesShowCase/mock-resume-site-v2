# ResumeSpice.com — Site Structure & Build Notes

Reference doc summarizing the observed structure, tech stack, and page composition of resumespice.com, based on crawling the live site (Sept 2026). Intended as a working reference for analysis, cloning, or rebuild work.

---

## 1. Tech Stack (Observed)

| Layer | Detected Technology | Evidence |
|---|---|---|
| CMS | WordPress | `/wp-content/uploads/...` asset paths, `meta-generator: Resume Spice v.3.0.23...` |
| Theme | Divi (Elegant Themes) child theme | `/wp-content/themes/divi-child/...` asset path |
| Page Builder | Divi Builder (module-based sections) | Repeating card/module patterns, tabbed content blocks on Process page |
| Analytics/Tracking | Google Tag Manager, Facebook Pixel (multiple pixel IDs), LinkedIn Insight Tag | `googletagmanager.com/ns.html?id=GTM-...`, `facebook.com/tr?id=...` (3 separate pixel IDs), `px.ads.linkedin.com/collect/?pid=...` |
| Tracking/Attribution Plugin | PixelYourSite (WP plugin) | `cd[plugin]=PixelYourSite` params on FB pixel calls |
| Cookie Consent | Cookiebot or similar CMP (TCF-based) | "Manage Consent" banner text, `cookiedatabase.org/tcf/purposes` link, vendor/category structure (Functional/Preferences/Statistics/Marketing) |
| Reviews Integration | Trustpilot widget/badges | `trustpilot.com/review/resumespice.com` links, badge images |
| E-commerce / Checkout | Custom cart at `/cart/`, "Buy Now" / "Add To Cart" actions | Visible cart link in header, buy buttons on pricing page (likely WooCommerce or a custom checkout, not confirmed) |
| Help Desk | Separate subdomain | `help.resumespice.com` (likely a helpdesk SaaS like HelpScout/Zendesk, not WordPress) |
| Affiliate Program | Awin network | Third-party listing at `ui.awin.com/merchant-profile/89733` |

**Note:** Exact checkout/payment processor was not directly observable from fetched HTML (Buy Now button resolved to `#`, likely JS-driven modal or redirect).

---

## 2. Global Layout (present on every page)

```
<head>
  - Standard WP meta (title, description, keywords)
  - Open Graph + Twitter Card meta (og:image, og:title, twitter:data1/2 = author/read-time)
  - Google Site Verification tag
  - robots meta: max-snippet:-1, max-image-preview:large, max-video-preview:-1
  - viewport: width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0
</head>

<body>
  [Tracking pixels - invisible, fire on every pageview]
  [Header]
    - Logo (links home)
    - Primary Nav (mega-menu style dropdowns, 6 top-level items)
    - Cart icon/link -> /cart/
    - "Tap here to call us now!" -> tel: link (mobile-first CTA)
    - Trustpilot badge(s)
  [Page-specific content — see section templates below]
  [Footer]
    - 4-column link grid: Our Services / Coaching / Resources / Company
    - Logo (light variant)
    - Trustpilot link
    - BBB A+ accreditation badge
    - Contact email
    - Social icons: Facebook, Twitter/X, LinkedIn
  [Cookie Consent Banner - modal/overlay]
    - Category toggles: Functional (locked on), Preferences, Statistics, Marketing
    - Buttons: Accept / Deny / View preferences / Manage options / Manage services / Manage vendors
  [Loading spinner element - "Did you know?" fact-loading UI, likely shown during AJAX page transitions]
</body>
```

### 2.1 Primary Navigation Structure (mega menu)

```
Our Services
├── Resume Writing            /our-services/best-professional-resume-writers/
├── Cover Letter Writing      /our-services/online-cover-letter-help/
├── LinkedIn Profile Writing  /our-services/professional-linkedin-profile-writing-services/
├── Interview Prep Coaching   /our-services/interview-preparation-help/
├── Thank You Letter          /our-services/thank-you-letter-after-job-interview/
├── Professional Bio          /our-services/online-professional-bio-writers/
├── Career Coaching           /our-services/professional-career-coaching-services/
├── Career Assessments        /our-services/career-assessments/
└── Outplacement Services     /our-services/outplacement-services-houston/  (B2B/employer-facing)

How it Works
├── Our Process                /how-to-make-a-professional-resume/
├── Who We Work With           /who-we-work-with/
└── Companies We Work With     /how-it-works/companies-we-work-with/

Why Us
├── Why ResumeSpice            /why-us/professional-resume-writer-service/
├── Reviews and Testimonials   /why-us/houston-resume-writer-reviews-2/
├── Success Stories            /why-us/houston-professional-resume-samples/
└── Our Guarantee               /why-us/resume-service-guarantee/

Pricing
├── Career Services            /pricing/resumes-cover-letters-interviews-linkedin/
├── Career Coaching            /pricing/career-coaching-services/
└── Career Assessments         /pricing/assessments/

Resources
├── Sample Resumes             /resources/sample-resumes-2/
├── Career Blog                /resources/resume-tips-layouts/
├── List of Top Recruiters (by location) /resources/list-of-top-recruiters-in-the-us/
│   ├── Houston    /resources/list-of-houston-recruiters-and-staffing-agencies/
│   ├── Dallas     /resources/dallas-recruiters-and-staffing-agencies/
│   ├── Austin     /resources/list-of-austin-recruiters-and-staffing-agencies/
│   ├── LA         /resources/los-angeles-recruiters-and-staffing-agencies/
│   ├── NYC        /resources/new-york-recruiters-and-staffing-agencies/
│   ├── Chicago    /resources/chicago-recruiters-and-staffing-agencies/
│   └── SF/Silicon Valley /resources/san-francisco-silicon-valley-recruiters-and-staffing-agencies/
├── Executive Resume Writers FAQ /resources/how-to-choose-an-executive-resume-writer/
└── Guest Blogger Guidelines   /resources/guest-blogger-guidelines/

About Us
├── Our Story        /about/our-story/
├── Meet the Team    /about/best-career-help-services/
├── Press            /about/press/
├── FAQ's            /about/frequently-asked-questions-about-resume-writers/
├── Logos / Images   /about/logos-images/
├── Locations        /locations/
└── Contact Us       /about/houston-resume-writing-service/

[Get Started] -> CTA button, top-right, links to Pricing page
```

**Pattern notes for rebuild:**
- Nav is organized as **6 top-level dropdown categories**, each 3–9 items deep — implies a mega-menu component, not a flat nav.
- URL slugs are **inconsistent in style** (some SEO-keyword-stuffed like `/our-services/best-professional-resume-writers/`, others short like `/who-we-work-with/`) — evidence of organic/iterative WordPress page creation over years rather than a single planned IA.
- A locations-by-city content pattern exists (`/resources/list-of-{city}-recruiters-and-staffing-agencies/`) — a programmatic-SEO content model worth replicating structurally (templated page generator per city).

---

## 3. Page Templates (by type)

### 3.1 Homepage (`/`)
1. Hero banner: H1 headline + primary CTA button ("Get Started")
2. Trust badges row (Trustpilot x2 badge variants)
3. **Testimonial carousel/grid** — ~11 short pull-quote testimonials, each: quote (bolded key phrase), client first name + last initial, "ResumeSpice client" label
4. Trust badges row (repeated) + Trustpilot link
5. Intro/positioning statement paragraph with CTA link
6. **Pricing tier cards** (3-up): Entry Level ($479) / Professional ($589) / Executive ($699)
   - Each card: title, price, bullet list of ~8 inclusions, CTA button
7. Guarantee callout block (image + heading + short copy, links to guarantee page)
8. "As Seen In" press logo strip (6 logos: HBJ, MarketWatch, Recruiter.com, WSJ, TheJobNetwork, Yahoo Finance)
9. **Cross-sell service cards** (4-up, icon+title+1-line desc+link): Cover Letter, LinkedIn, Interview Prep, Career Coaching
10. Client-outcome logo strip ("companies where clients landed jobs" — ~20 logos: Apple, Google, Amazon, Meta, Microsoft, Goldman Sachs, etc.)
11. **"Why Choose ResumeSpice" long-form section** — H1 + bulleted value props (7 bullets), bolded key phrases
12. Footer (global)

### 3.2 Pricing / Order Page (`/pricing/resumes-cover-letters-interviews-linkedin/`)
A **multi-step product configurator on a single page**, not a traditional WooCommerce cart flow:
1. Page H1 + instructions ("select options, click Buy Now")
2. Single testimonial callout w/ star rating + "read more reviews" link
3. **Step 1: Resume tier selection** — 3 selectable cards (Entry/Professional/Executive), same bullet structure as homepage
4. **Step 2: Add-on selection** — 5 selectable add-on cards (Cover Letter $199, LinkedIn $199, Interview Prep $179, Professional Bio $199, Thank You Letter $129), each minimal (price + 1-2 bullets)
5. Disclaimer note (LinkedIn add-on dependency on resume purchase)
6. **Step 3: Buy Now button** + guarantee badge image
7. Footer (global)

→ This implies a **client-side cart/state pattern**: selections in steps 1–2 accumulate into a single order before checkout. For a rebuild, model this as a form with radio-group (Step 1, single-select) + checkbox-group (Step 2, multi-select) feeding a running total, then a submit/checkout action.

### 3.3 Service Detail / Long-form Content Page (e.g. `/why-us/professional-resume-writer-service/`)
1. H1
2. Email newsletter signup widget (First Name / Last Name / Email / Sign Up) — appears mid-page, not just footer
3. Long-form intro paragraph
4. **Comparison table** (ResumeSpice vs. "Typical Resume Writers") — 8 feature rows, Yes/Unproven/Templates-style contrast copy
5. **Value-prop grid** (6-up, icon+title+1-line): We Get Results / Personal Touch / We're Experts / One-Stop Shop / We're Fast / Guaranteed
6. Footer (global)

### 3.4 Process/Tabbed Content Page (`/how-to-make-a-professional-resume/`)
1. H1 + intro paragraph
2. **Tab component** with 5 tabs: Resumes / Cover Letters / LinkedIn / Interviews / Career Coaching
   - Each tab reveals a **numbered step list** (4–7 steps), steps contain inline links to related service pages
3. Closing CTA block (phone number + "Let's Get Started!" button)
4. Footer (global)

### 3.5 Inferred but not fetched: About subpages, FAQ, Locations, Contact
Based on nav structure and typical WP patterns, expect:
- `/about/our-story/` — narrative/timeline page (founding story, founders' bios)
- `/about/best-career-help-services/` — team grid (photo + name + title cards)
- `/about/press/` — press mention list/logo grid with links
- `/about/frequently-asked-questions-about-resume-writers/` — FAQ accordion component
- `/about/logos-images/` — brand asset download page
- `/locations/` — city-based service area list (service is remote/phone-based; likely SEO-driven, not physical offices)
- `/about/houston-resume-writing-service/` — contact form + phone/email + possibly office address (Houston HQ)

---

## 4. Recurring UI Components (to build as reusable elements)

| Component | Used On | Notes |
|---|---|---|
| Pricing Tier Card | Home, Pricing | title, price, bullet list, CTA |
| Add-on Product Card | Pricing | compact variant of tier card |
| Testimonial Quote Card | Home, Pricing, Why Us | bolded pull-quote + attribution |
| Logo Strip | Home | press logos, client-outcome logos (2 variants, different meaning) |
| Comparison Table | Why Us | 2-column feature comparison |
| Value Prop Grid Item | Home, Why Us | icon + short title + 1-liner |
| Tabbed Step List | Process page | tab nav + numbered steps w/ inline links |
| Newsletter Signup Form | Why Us (and likely others) | First/Last/Email fields |
| Guarantee Badge Callout | Home, Pricing | image + heading + short copy + link |
| Cookie Consent Banner | Global | TCF-style categories |
| Sticky/Header Call CTA | Global header | `tel:` link, "Tap here to call us now!" |
| Trustpilot Badge/Link | Global (header + footer + repeated inline) | |

---

## 5. Content/Copy Patterns

- Pricing tiers are differentiated **only by years-of-experience targeting and price** — feature list is otherwise identical across tiers (all 3 tiers list the same 8 bullet inclusions verbatim except the eligibility line).
- Heavy use of **bolded phrases within sentences** for scannability (Divi's default styling pattern — treat as emphasis spans, not full headings).
- Guarantee ("60 Day Interview Guarantee") is repeated as a trust anchor across nearly every page template.
- CTAs consistently route to one of two destinations: the Pricing/order page, or a `tel:` link.
- Meta descriptions and OG/Twitter tags are filled in per-page (good SEO hygiene) with consistent brand suffix pattern (`| ResumeSpice`).
- A page (`/learn-about-resumespice/`) exists specifically labeled "For AI, Learn About ResumeSpice" — an AI-crawler-targeted summary page (emerging pattern worth noting/replicating for llm-answer-engine optimization).

---

## 6. Rebuild/Clone Recommendations (if this doc is used to scaffold a new site)

1. **Framework-agnostic component list** (Section 4) can map directly to components in a modern stack (e.g., Next.js + Tailwind): `PricingCard`, `TestimonialCard`, `LogoStrip`, `ComparisonTable`, `ValuePropGrid`, `TabbedSteps`, `NewsletterForm`, `CookieConsentBanner`.
2. **Data-driven content**: pricing tiers, add-ons, testimonials, nav structure, and comparison-table rows should live in structured data (JSON/CMS collections), not hardcoded markup — the current site's repetition (same bullet list 2–3x per page) suggests this wasn't originally done, and is worth fixing in a rebuild.
3. **Programmatic city pages**: the recruiter-directory-by-city pattern (Section 2.1, Resources) is a good candidate for a single templated route (`/resources/recruiters/[city]`) driven by a city dataset, rather than one-off WP pages.
4. **Checkout flow**: model Section 3.2 as a proper multi-step form with state (selected tier + selected add-ons + computed total) rather than the ambiguous "Buy Now -> #" seen in the current HTML.
5. **Tracking**: current site fires GTM + 3x Facebook Pixel IDs + LinkedIn Insight Tag directly in markup; consolidate into a single tag-manager-driven setup in a rebuild.
6. **Consent management**: current TCF/vendor-based CMP is heavier than likely needed; a simpler custom cookie-consent component (accept/deny + preferences) would suffice unless ad-tech vendor governance is a hard requirement.

---

## 7. Known Gaps / Unverified

- Exact checkout/payment provider (Stripe, WooCommerce, custom) — not confirmed from fetched markup.
- Full content of About subpages (Our Story, Meet the Team, Press, FAQ, Locations, Contact) — nav links identified but pages themselves weren't directly retrievable during this crawl; recommend a follow-up direct crawl/screenshot pass before treating Section 3.5 as authoritative.
- Mobile-specific layout differences (crawl was HTML-only, not visual/responsive).
- Whether pricing figures/copy shown reflect currently live A/B tests (some copy showed strikethrough formatting artifacts in extraction, e.g. `~~text~~`, which may indicate hidden/toggled content rather than actual strikethrough styling — verify visually before relying on exact wording).
