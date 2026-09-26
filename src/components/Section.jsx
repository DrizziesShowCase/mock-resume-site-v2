import { Eyebrow } from './Eyebrow.jsx'
import './Section.css'

// A full-width page band. `tone` alternates paper and shade surfaces to give
// the page rhythm without borders (docs/PRD.md §7.6).
export function Section({ tone = 'paper', labelledBy, label, compact = false, className = '', children }) {
  const classes = ['section', `section--${tone}`, compact ? 'section--compact' : '', className].filter(Boolean).join(' ')
  return (
    <section className={classes} aria-labelledby={labelledBy} aria-label={label}>
      <div className="container">{children}</div>
    </section>
  )
}

// Eyebrow + heading, with an optional lead paragraph set beside it on wide screens.
export function SectionHeader({ id, eyebrow, title, lead }) {
  return (
    <div className={`section-header${lead ? ' section-header--split' : ''}`}>
      <div className="section-header__main">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="section-header__title">
          {title}
        </h2>
      </div>
      {lead && <p className="section-header__lead">{lead}</p>}
    </div>
  )
}
