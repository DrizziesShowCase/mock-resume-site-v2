import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import './Logo.css'

export function Logo({ onInk = false, onClick }) {
  return (
    <Link to="/" className={`logo${onInk ? ' logo--on-ink' : ''}`} aria-label={`${site.name} home`} onClick={onClick}>
      <span className="logo__word">{site.shortName}</span>
      <span className="logo__sub" aria-hidden="true">
        Résumé Co.
      </span>
    </Link>
  )
}
