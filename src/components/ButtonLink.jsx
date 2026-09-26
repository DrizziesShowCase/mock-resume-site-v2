import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './ButtonLink.css'

// A link styled as a button. Internal routes use `to`; tel:/mailto:/external use `href`.
// Primary CTAs carry a trailing arrow (docs/PRD.md §7.7).
export function ButtonLink({ to, href, variant = 'primary', size = 'md', arrow = false, className = '', children, ...rest }) {
  const classes = ['btn', `btn--${variant}`, size === 'lg' ? 'btn--lg' : '', className].filter(Boolean).join(' ')
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="btn__arrow" size={size === 'lg' ? 18 : 16} strokeWidth={1.75} aria-hidden="true" />}
    </>
  )
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={classes} {...rest}>
      {content}
    </Link>
  )
}
