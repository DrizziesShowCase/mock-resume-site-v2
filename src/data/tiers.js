// Résumé tiers. The tiers share one process and differ only in writer seniority
// and intake depth, so the shared list is kept separate and each tier lists
// only what differs (docs/PRD.md §6.2).
export const sharedInclusions = [
  'One-on-one intake call',
  'ATS-ready formatting',
  'Keywords matched to your target role',
  'Two revision rounds',
  'Word + PDF files',
  'The Shortlist Guarantee',
]

export const tiers = [
  {
    id: 'early',
    name: 'Early Career',
    audience: '0–5 years of experience',
    price: 449,
    differs: ['Certified résumé writer', '30-minute intake call', 'First draft in 5 business days'],
  },
  {
    id: 'professional',
    name: 'Professional',
    audience: '5–15 years of experience',
    price: 569,
    featured: true,
    differs: ['Senior résumé writer', '45-minute intake call', 'First draft in 5 business days'],
  },
  {
    id: 'executive',
    name: 'Executive',
    audience: '15+ years or leadership roles',
    price: 689,
    differs: ['Executive-level writer', '60-minute intake call', 'Leadership brand statement'],
  },
]
