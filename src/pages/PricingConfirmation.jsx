import { Navigate, useNavigate } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.jsx'
import { Eyebrow } from '../components/Eyebrow.jsx'
import { OrderLines } from '../components/OrderSheet.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { Timeline } from '../components/Timeline.jsx'
import { processTabs } from '../data/process.js'
import { site } from '../data/site.js'
import { useOrder } from '../order/useOrder.js'
import './PricingConfirmation.css'

const longDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

// The order has been placed, so "What happens next" starts after step 1.
const resumeSteps = processTabs.find((tab) => tab.id === 'resumes').steps
const nextSteps = resumeSteps.slice(1)

// The confirmation is set as a finished letter — the end point of the
// résumé-being-assembled story the Order Sheet started (docs/PRD.md §7.3).
export function PricingConfirmation() {
  const { state, order, dispatch } = useOrder()
  const navigate = useNavigate()

  if (!state.placed) return <Navigate to="/pricing" replace />

  const { details, placed } = state
  const firstName = details.name.trim().split(/\s+/)[0]

  const startOver = () => {
    dispatch({ type: 'reset' })
    navigate('/pricing')
  }

  return (
    <>
      <PageMeta title="Order confirmed" />
      <div className="container confirmation">
        <article className="letter" aria-labelledby="letter-title">
          <header className="letter__head">
            <p className="letter__brand">{site.name}</p>
            <p className="letter__date">{longDate.format(new Date(placed.placedAt))}</p>
          </header>

          <h1 id="letter-title" className="letter__title">
            Your order is confirmed.
          </h1>

          <p className="letter__salutation">Dear {firstName},</p>
          <p className="letter__para">
            Thank you for choosing {site.shortName}. Your {order.tier.name} résumé is on our desk, and we’re matching you
            with a writer who knows what hiring managers look for in <strong>{details.targetRole.trim()}</strong>{' '}
            candidates.
          </p>
          <p className="letter__para">
            Your writer will email <strong>{details.email.trim()}</strong> within one business day to book your intake
            call.
          </p>

          <div className="letter__number">
            <span className="letter__number-label">Order number</span>
            <span className="letter__number-value tabular">{placed.number}</span>
          </div>

          <OrderLines order={order} headingLevel={2} />

          <div className="letter__sign">
            <p>Sincerely,</p>
            <p className="letter__signature" aria-hidden="true">
              The Shortlist team
            </p>
            <p className="letter__signed">The Shortlist team · {site.name}</p>
          </div>
        </article>

        <p className="confirmation__demo">
          Portfolio demo: no payment was taken, nothing was sent, and no email will arrive.
        </p>

        <section className="confirmation__next" aria-labelledby="next-title">
          <Eyebrow>What happens next</Eyebrow>
          <h2 id="next-title" className="confirmation__next-title">
            From here to your final files
          </h2>
          <Timeline steps={nextSteps} start={2} />
          <div className="confirmation__actions">
            <button type="button" className="btn btn--secondary btn--lg" onClick={startOver}>
              Start a new order
            </button>
            <ButtonLink to="/" size="lg" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </section>
      </div>
    </>
  )
}
