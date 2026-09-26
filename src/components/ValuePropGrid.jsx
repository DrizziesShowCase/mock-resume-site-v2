import { Icon } from './Icon.jsx'
import './ValuePropGrid.css'

export function ValuePropGrid({ items }) {
  return (
    <ul role="list" className="value-grid">
      {items.map((item) => (
        <li key={item.id} className="value-grid__item">
          <Icon name={item.icon} size={26} className="value-grid__icon" />
          <h3 className="value-grid__title">{item.title}</h3>
          <p className="value-grid__text">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
