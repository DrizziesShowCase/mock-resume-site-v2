import { PagePlaceholder } from '../components/PagePlaceholder.jsx'
import { ButtonLink } from '../components/ButtonLink.jsx'
import { site } from '../data/site.js'

export function Home() {
  return (
    <PagePlaceholder
      eyebrow="Résumé & career writing"
      title={site.tagline}
      lead="A certified writer interviews you, then rewrites your experience into a résumé recruiters actually call back. Written by a person, never a template."
      note="Placeholder — the full home page (hero, tiers, testimonials, guarantee) is built in milestone M1 (docs/PRD.md §12)."
      actions={
        <>
          <ButtonLink to="/pricing" size="lg" arrow>
            Build your order
          </ButtonLink>
          <ButtonLink to="/process" size="lg" variant="secondary">
            See how it works
          </ButtonLink>
        </>
      }
    />
  )
}
