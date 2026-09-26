import { Check } from 'lucide-react'
import { formatPrice } from '../lib/format.js'
import './OptionCard.css'
import './TierOption.css'

// Selectable tier card for the order configurator: one radio in the "tier" group.
// The input is named by tier + price and described by audience + differences,
// so screen readers don't have to read the whole card as its label.
export function TierOption({ tier, checked, onSelect }) {
  const id = `tier-option-${tier.id}`
  return (
    <label className={`option-card tier-option${tier.featured ? ' tier-option--featured' : ''}`}>
      <input
        type="radio"
        name="tier"
        value={tier.id}
        checked={checked}
        onChange={() => onSelect(tier.id)}
        className="option-card__input"
        aria-labelledby={`${id}-name ${id}-price`}
        aria-describedby={`${id}-audience ${id}-differs`}
      />
      {tier.featured && (
        <span className="tier-option__tab" aria-hidden="true">
          Most chosen
        </span>
      )}
      <span className="tier-option__body">
        <span className="tier-option__head">
          <span className="tier-option__titles">
            <span id={`${id}-name`} className="tier-option__name">
              {tier.name}
            </span>
            <span id={`${id}-audience`} className="tier-option__audience">
              {tier.audience}
            </span>
          </span>
          <span className="option-indicator option-indicator--radio" aria-hidden="true">
            <Check size={12} strokeWidth={3} />
          </span>
        </span>
        <span id={`${id}-price`} className="tier-option__price tabular">
          {formatPrice(tier.price)}
        </span>
        <span className="tier-option__label" aria-hidden="true">
          What’s different
        </span>
        <span id={`${id}-differs`} className="tier-option__differs">
          {tier.differs.map((item) => (
            <span key={item} className="tier-option__item">
              <Check size={14} strokeWidth={2.2} aria-hidden="true" />
              {item}
            </span>
          ))}
        </span>
      </span>
    </label>
  )
}
