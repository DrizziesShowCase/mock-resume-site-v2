import { Check } from 'lucide-react'
import { formatPrice } from '../lib/format.js'
import './OptionCard.css'
import './AddonOption.css'

// Selectable add-on card for the order configurator: a checkbox.
export function AddonOption({ addon, checked, onToggle }) {
  const id = `addon-option-${addon.id}`
  return (
    <label className="option-card addon-option">
      <input
        type="checkbox"
        name="addons"
        value={addon.id}
        checked={checked}
        onChange={() => onToggle(addon.id)}
        className="option-card__input"
        aria-labelledby={`${id}-name ${id}-price`}
        aria-describedby={`${id}-blurb`}
      />
      <span className="option-indicator option-indicator--check" aria-hidden="true">
        <Check size={12} strokeWidth={3} />
      </span>
      <span className="addon-option__text">
        <span id={`${id}-name`} className="addon-option__name">
          {addon.name}
        </span>
        <span id={`${id}-blurb`} className="addon-option__blurb">
          {addon.blurb}
        </span>
      </span>
      <span id={`${id}-price`} className="addon-option__price tabular">
        +{formatPrice(addon.price)}
      </span>
    </label>
  )
}
