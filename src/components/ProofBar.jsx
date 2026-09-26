import { Award, PenLine, Star } from 'lucide-react'
import { site } from '../data/site.js'
import './ProofBar.css'

// One row of trust signals under the hero. The reference site repeats its
// trust badges three times per page; we show them once.
export function ProofBar() {
  const items = [
    {
      Icon: Star,
      title: `${site.rating.value} / ${site.rating.outOf} average client rating`,
      text: `${site.rating.isSample ? 'Sample data · ' : ''}${site.rating.count} reviews`,
    },
    { Icon: Award, title: site.guarantee.name, text: site.guarantee.short },
    { Icon: PenLine, title: 'Certified résumé writers', text: 'One writer, start to finish, by name' },
  ]
  return (
    <section className="container" aria-label="Why clients trust Shortlist">
      <ul role="list" className="proof-bar">
        {items.map(({ Icon, title, text }) => (
          <li key={title} className="proof-bar__item">
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="proof-bar__icon" />
            <div>
              <p className="proof-bar__title">{title}</p>
              <p className="proof-bar__text">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
