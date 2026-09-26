// Optional services added on top of a résumé tier. `requires: 'tier'` means the
// add-on is built from the new résumé, so the order flow asks for a tier first.
export const addons = [
  {
    id: 'cover',
    name: 'Cover Letter',
    price: 179,
    blurb: 'Tailored to one role, reusable as a template.',
    homeBlurb: 'A letter that tells the story your résumé can’t.',
    icon: 'FileText',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Profile',
    price: 189,
    blurb: 'Headline, About and experience rewritten.',
    homeBlurb: 'Get found by the recruiters already searching.',
    icon: 'IdCard',
    requires: 'tier',
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    price: 169,
    blurb: 'One 60-minute mock interview with feedback.',
    homeBlurb: 'Rehearse with a coach before the real thing.',
    icon: 'MessagesSquare',
  },
  {
    id: 'bio',
    name: 'Professional Bio',
    price: 179,
    blurb: 'Short and long versions for web and events.',
    icon: 'UserRound',
  },
  {
    id: 'thanks',
    name: 'Thank-You Letter',
    price: 99,
    blurb: 'A post-interview note that gets remembered.',
    icon: 'Mail',
  },
]
