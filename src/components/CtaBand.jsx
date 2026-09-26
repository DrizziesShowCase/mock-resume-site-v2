import { Phone } from 'lucide-react'
import { site } from '../data/site.js'
import { ButtonLink } from './ButtonLink.jsx'
import './CtaBand.css'

// Closing call to action used at the end of content pages.
export function CtaBand({ title = site.tagline, text = 'Tell us where you’re headed. A writer will take it from there.' }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <div className="cta-band__copy">
          <h2 id="cta-title" className="cta-band__title">
            {title}
          </h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <div className="cta-band__actions">
          <ButtonLink to="/pricing" size="lg" arrow>
            Build your order
          </ButtonLink>
          <a href={site.phone.href} className="cta-band__phone tabular">
            <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
            or call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
