import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { site } from '../data/site.js'
import { GuaranteeSeal } from './GuaranteeSeal.jsx'
import './GuaranteeCallout.css'

export function GuaranteeCallout() {
  return (
    <div className="guarantee-callout">
      <GuaranteeSeal size={128} />
      <div className="guarantee-callout__body">
        <h2 id="guarantee-title" className="guarantee-callout__title">
          {site.guarantee.name}
        </h2>
        <p className="guarantee-callout__text">
          {site.guarantee.short} Every résumé tier is covered. If the calls don’t come, your writer starts again, at no
          cost.
        </p>
        <Link to="/why-us#guarantee" className="guarantee-callout__link">
          Read the guarantee
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
