import { Link } from 'react-router-dom'
import './Timeline.css'

// Numbered vertical timeline. Markers are styled like the dates column of a
// résumé. `start` offsets the numbering when a list begins mid-process.
export function Timeline({ steps, start = 1 }) {
  return (
    <ol role="list" className="timeline">
      {steps.map((step, i) => (
        <li key={step.title} className="timeline__step">
          <span className="timeline__marker tabular" aria-hidden="true">
            {String(start + i).padStart(2, '0')}
          </span>
          <div className="timeline__body">
            <h3 className="timeline__title">
              <span className="sr-only">Step {start + i}: </span>
              {step.title}
            </h3>
            <p className="timeline__text">{step.text}</p>
            {step.link && (
              <Link to={step.link.to} className="timeline__link">
                {step.link.label}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
