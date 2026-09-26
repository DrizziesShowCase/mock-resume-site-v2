import { ButtonLink } from './ButtonLink.jsx'
import { Eyebrow } from './Eyebrow.jsx'
import { PageMeta } from './PageMeta.jsx'
import './PagePlaceholder.css'

// Stand-in for pages that later milestones will build out (docs/PRD.md §12).
export function PagePlaceholder({ metaTitle, eyebrow, title, lead, note, actions }) {
  return (
    <section className="placeholder container">
      <PageMeta title={metaTitle} />
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="placeholder__title">{title}</h1>
      {lead && <p className="placeholder__lead">{lead}</p>}
      {note && <p className="placeholder__note">{note}</p>}
      <div className="placeholder__actions">
        {actions ?? (
          <>
            <ButtonLink to="/pricing" size="lg" arrow>
              Build your order
            </ButtonLink>
            <ButtonLink to="/" size="lg" variant="secondary">
              Back to home
            </ButtonLink>
          </>
        )}
      </div>
    </section>
  )
}
