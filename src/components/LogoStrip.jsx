import { logoStrips } from '../data/logos.js'
import './LogoStrip.css'

// A row of invented company or publication names, set as typographic
// wordmarks. Each variant is labelled so "clients landed at" can't be read as
// "as featured in".
export function LogoStrip({ variant = 'clients' }) {
  const strip = logoStrips[variant]
  return (
    <div className="logo-strip">
      <p className="logo-strip__label">
        {strip.label}
        <span className="logo-strip__note"> · {strip.note}</span>
      </p>
      <ul role="list" className="logo-strip__list">
        {strip.names.map((name, i) => (
          <li key={name} className={`logo-strip__mark logo-strip__mark--${i % 3}`}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
