// Step-by-step process per service, shown as tabs on /process. The résumé
// steps double as "What happens next" on the order confirmation page.
export const processTabs = [
  {
    id: 'resumes',
    label: 'Résumés',
    heading: 'How your résumé gets written',
    steps: [
      { title: 'Place your order', text: 'Choose the tier that matches your experience and add anything else you need.', link: { label: 'Build your order', to: '/pricing' } },
      { title: 'Share what you have', text: 'Upload your current résumé and a few roles you’re targeting. Rough is fine.' },
      { title: 'Meet your writer', text: 'A one-on-one intake call to find the wins, numbers and stories your résumé is missing.' },
      { title: 'Review your first draft', text: 'Your draft arrives within five to seven business days, written from scratch.' },
      { title: 'Revise together', text: 'Two full revision rounds. Every note is answered, not just applied.' },
      { title: 'Get your final files', text: 'ATS-ready Word and PDF versions, plus a plain-text copy for online forms.' },
    ],
  },
  {
    id: 'cover-letters',
    label: 'Cover Letters',
    heading: 'How your cover letter gets written',
    steps: [
      { title: 'Pick a target role', text: 'Send the posting you care about most. We write to it, then show you how to adapt it.' },
      { title: 'Draft from your résumé', text: 'Your writer builds the letter from the same intake, so the story stays consistent.' },
      { title: 'Revise and reuse', text: 'One revision round, plus a short guide for tailoring it to future roles.' },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    heading: 'How your LinkedIn profile gets rewritten',
    steps: [
      { title: 'Start from your new résumé', text: 'LinkedIn is written after your résumé, so both say the same thing.', link: { label: 'See résumé tiers', to: '/pricing' } },
      { title: 'Rewrite the key sections', text: 'Headline, About and experience, written for how recruiters search.' },
      { title: 'Tune for search', text: 'Skills and keywords chosen to surface you for the roles you want.' },
      { title: 'Update and go live', text: 'You paste it in with our checklist, or we walk you through it on a call.' },
    ],
  },
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    heading: 'How interview prep works',
    steps: [
      { title: 'Book your session', text: 'Pick a 60-minute slot with a coach who knows your field.' },
      { title: 'Share the role', text: 'Send the job description and anything you know about the interview format.' },
      { title: 'Mock interview', text: 'A realistic interview, recorded so you can watch it back.' },
      { title: 'Feedback and plan', text: 'Written notes on your answers and the three things to practise most.' },
    ],
  },
  {
    id: 'career-coaching',
    label: 'Career Coaching',
    heading: 'How career coaching works',
    steps: [
      { title: 'Discovery call', text: 'A free 20-minute call to see whether coaching is the right fit.' },
      { title: 'Set your goals', text: 'Agree what a good outcome looks like: a new role, a promotion or a change of field.' },
      { title: 'Work the plan', text: 'Regular sessions on positioning, networking and applications.' },
      { title: 'Negotiate the offer', text: 'Prepare for the salary conversation before it happens.' },
    ],
  },
]
