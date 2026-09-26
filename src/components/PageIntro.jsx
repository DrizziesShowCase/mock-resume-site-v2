import { Eyebrow } from './Eyebrow.jsx'
import './PageIntro.css'

// Opening block for content pages: eyebrow, the page's single h1, and a lead.
export function PageIntro({ eyebrow, title, lead, children }) {
  return (
    <header className="page-intro container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="page-intro__title">{title}</h1>
      {lead && <p className="page-intro__lead">{lead}</p>}
      {children}
    </header>
  )
}
