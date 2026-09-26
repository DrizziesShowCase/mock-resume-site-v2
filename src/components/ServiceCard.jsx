import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { formatPrice } from '../lib/format.js'
import { Icon } from './Icon.jsx'
import './ServiceCard.css'

// Home-page teaser for an add-on. The whole card is one link into the order
// configurator with that add-on preselected.
export function ServiceCard({ addon }) {
  return (
    <Link to={`/pricing?addon=${addon.id}`} className="service-card">
      <Icon name={addon.icon} size={26} className="service-card__icon" />
      <h3 className="service-card__title">{addon.name}</h3>
      <p className="service-card__text">{addon.homeBlurb}</p>
      <p className="service-card__foot">
        <span className="tabular">+{formatPrice(addon.price)}</span>
        <span className="service-card__action">
          Add to order
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </p>
    </Link>
  )
}
