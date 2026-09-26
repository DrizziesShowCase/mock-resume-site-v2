// Navigation for the header, mobile menu and footer. The Services menu is
// built from the tier and add-on data so names never drift out of sync.
import { site } from './site.js'
import { tiers } from './tiers.js'
import { addons } from './addons.js'

export const primaryNav = [
  { label: 'Services', menu: 'services' },
  { label: 'Our Process', to: '/process' },
  { label: 'Why Shortlist', to: '/why-us' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/faq' },
]

export const servicesMenu = [
  {
    heading: 'Résumés',
    links: tiers.map((t) => ({ label: `${t.name} résumé`, meta: t.audience, to: `/pricing?tier=${t.id}` })),
  },
  {
    heading: 'Add-ons',
    links: addons.map((a) => ({ label: a.name, meta: a.blurb, to: `/pricing?addon=${a.id}` })),
  },
  {
    heading: 'Not sure?',
    links: [
      { label: 'See how it works', meta: 'Every step, from order to final files', to: '/process' },
      { label: 'Read the FAQ', meta: 'Tiers, timing and the guarantee', to: '/faq' },
    ],
    phone: true,
  },
]

export const footerColumns = [
  {
    heading: 'Services',
    links: [
      { label: 'Résumé writing', to: '/pricing' },
      { label: 'Cover letters', to: '/pricing?addon=cover' },
      { label: 'LinkedIn profiles', to: '/pricing?addon=linkedin' },
      { label: 'Interview prep', to: '/pricing?addon=interview' },
    ],
  },
  {
    heading: 'Process',
    links: [
      { label: 'How it works', to: '/process' },
      { label: 'Résumé process', to: '/process?tab=resumes' },
      { label: 'LinkedIn process', to: '/process?tab=linkedin' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Why Shortlist', to: '/why-us' },
      { label: 'Our guarantee', to: '/why-us#guarantee' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact us', to: '/faq#contact' },
      { label: site.phone.display, href: site.phone.href },
    ],
  },
]
