// Brand-level facts used across the whole site. Shortlist Résumé Co. is fictional
// (see docs/PRD.md §3) — nothing here refers to a real business.
export const site = {
  name: 'Shortlist Résumé Co.',
  shortName: 'Shortlist',
  tagline: 'Get on the shortlist.',
  description:
    'Certified résumé writers who interview you, then rewrite your experience into a résumé recruiters call back.',
  phone: { display: '(555) 010-0199', href: 'tel:+15550100199' },
  email: 'hello@shortlist.example',
  hours: 'Mon–Fri, 8am–6pm CT',
  rating: { value: '4.9', outOf: '5', count: '1,200+', isSample: true },
  guarantee: {
    name: 'The Shortlist Guarantee',
    short: 'Interviews within 60 days, or a free rewrite.',
    terms: [
      'If your new résumé hasn’t landed you an interview within 60 days of final delivery, your writer rewrites it for free.',
      'Send us the roles you applied to and we’ll use them to sharpen the rewrite.',
      'The guarantee covers every résumé tier. Add-ons are covered when bought with a résumé.',
    ],
  },
  disclaimer:
    'Portfolio demo. Shortlist Résumé Co. is a fictional company. No orders are processed.',
}
