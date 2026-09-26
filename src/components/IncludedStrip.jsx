import { Check } from 'lucide-react'
import { sharedInclusions } from '../data/tiers.js'
import './IncludedStrip.css'

// What every tier includes. Shown once above the tier cards so each card
// only needs to list what's different.
export function IncludedStrip() {
  return (
    <div className="included-strip">
      <h3 id="included-heading" className="included-strip__heading">
        Every tier includes
      </h3>
      <ul role="list" aria-labelledby="included-heading" className="included-strip__list">
        {sharedInclusions.map((item) => (
          <li key={item}>
            <Check size={15} strokeWidth={2.2} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
