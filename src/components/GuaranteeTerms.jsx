import { site } from '../data/site.js'
import { GuaranteeSeal } from './GuaranteeSeal.jsx'
import './GuaranteeTerms.css'

// The full guarantee, in plain language. Home's guarantee callout links here.
export function GuaranteeTerms() {
  return (
    <div className="guarantee-terms">
      <div className="guarantee-terms__seal">
        <GuaranteeSeal size={144} />
      </div>
      <div className="guarantee-terms__body">
        <h2 id="guarantee-title" className="guarantee-terms__title">
          {site.guarantee.name}
        </h2>
        <p className="guarantee-terms__short">{site.guarantee.short}</p>
        <ol className="guarantee-terms__list">
          {site.guarantee.terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
