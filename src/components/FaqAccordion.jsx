import { Plus } from 'lucide-react'
import './FaqAccordion.css'

// Grouped questions using native <details>/<summary>: keyboard, screen reader
// and find-in-page support come from the browser.
export function FaqAccordion({ groups }) {
  return (
    <div className="faq">
      {groups.map((group) => (
        <section key={group.id} className="faq__group" aria-labelledby={`faq-${group.id}`}>
          <h2 id={`faq-${group.id}`} className="faq__heading">
            {group.label}
          </h2>
          <div className="faq__items">
            {group.items.map((item) => (
              <details key={item.q} className="faq__item">
                <summary className="faq__question">
                  <span>{item.q}</span>
                  <Plus className="faq__icon" size={20} strokeWidth={1.75} aria-hidden="true" />
                </summary>
                <p className="faq__answer">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
