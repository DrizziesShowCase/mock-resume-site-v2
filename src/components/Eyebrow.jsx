import './Eyebrow.css'

// Section label styled like a résumé section heading: small caps + hairline rule.
export function Eyebrow({ children, onInk = false, as: Tag = 'p' }) {
  return (
    <Tag className={`eyebrow${onInk ? ' eyebrow--on-ink' : ''}`}>
      <span>{children}</span>
      <span className="eyebrow__rule" aria-hidden="true" />
    </Tag>
  )
}
