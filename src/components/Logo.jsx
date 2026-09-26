import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import './Logo.css'

// The accessible name starts with the visible words ("Shortlist Résumé Co.")
// so speech-control users can say what they see (WCAG 2.5.3); ", home" is
// added for screen readers only.
export function Logo({ onInk = false, onClick }) {
  return (
    <Link to="/" className={`logo${onInk ? ' logo--on-ink' : ''}`} onClick={onClick}>
      <span className="logo__word">{site.shortName}</span> <span className="logo__sub">Résumé Co.</span>
      <span className="sr-only">, home</span>
    </Link>
  )
}
