import { Check } from 'lucide-react'
import { formatPrice } from '../lib/format.js'
import { ButtonLink } from './ButtonLink.jsx'
import './TierCard.css'

// Display variant of a résumé tier (Home). The featured tier inverts to ink,
// the only dark surface above the footer. The selectable variant for the
// order configurator is added in M2.
export function TierCard({ tier }) {
  const featured = Boolean(tier.featured)
  return (
    <article className={`tier-card${featured ? ' tier-card--featured' : ''}`} aria-labelledby={`tier-${tier.id}`}>
      {featured && <p className="tier-card__tab">Most chosen</p>}
      <header className="tier-card__header">
        <h3 id={`tier-${tier.id}`} className="tier-card__name">
          {tier.name}
        </h3>
        <p className="tier-card__audience">{tier.audience}</p>
      </header>
      <p className="tier-card__price tabular">{formatPrice(tier.price)}</p>
      <ul role="list" className="tier-card__list">
        {tier.differs.map((item) => (
          <li key={item}>
            <Check size={16} strokeWidth={2.2} aria-hidden="true" className="tier-card__check" />
            {item}
          </li>
        ))}
      </ul>
      <ButtonLink
        to={`/pricing?tier=${tier.id}`}
        variant={featured ? 'on-ink' : 'secondary'}
        arrow={featured}
        className="tier-card__cta"
        aria-label={`Choose the ${tier.name} résumé`}
      >
        Choose {tier.name}
      </ButtonLink>
    </article>
  )
}
