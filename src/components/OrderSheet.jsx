import { useId } from 'react'
import { Link } from 'react-router-dom'
import { Award } from 'lucide-react'
import { site } from '../data/site.js'
import { formatPrice } from '../lib/format.js'
import { useOrder } from '../order/useOrder.js'
import { ButtonLink } from './ButtonLink.jsx'
import './OrderSheet.css'

const longDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

// A red editor's tick, drawn once as each line lands on the sheet.
function Tick() {
  return (
    <svg className="order-lines__tick" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path className="order-lines__tick-path" pathLength="1" d="M4 13 9 18 20 5" />
    </svg>
  )
}

function Line({ label, amount, note }) {
  return (
    <li className="order-lines__line">
      <span className="order-lines__row">
        <Tick />
        <span className="order-lines__label">{label}</span>
        <span className="order-lines__leader" aria-hidden="true" />
        <span className="order-lines__amount tabular">{amount}</span>
      </span>
      {note && <span className="order-lines__note">{note}</span>}
    </li>
  )
}

// Line items with dotted leaders, like the dates column of a résumé. Shared by
// the Order Sheet and the confirmation letter.
export function OrderLines({ order }) {
  const blocked = new Set(order.blockedAddons.map((a) => a.id))
  return (
    <div className="order-lines">
      <div className="order-lines__section">
        <h3 className="order-lines__heading">Résumé</h3>
        {order.tier ? (
          <ul role="list">
            <Line key={order.tier.id} label={`${order.tier.name} résumé`} amount={formatPrice(order.tier.price)} />
          </ul>
        ) : (
          <p className="order-lines__empty">No tier chosen yet</p>
        )}
      </div>
      <div className="order-lines__section">
        <h3 className="order-lines__heading">Add-ons</h3>
        {order.addons.length ? (
          <ul role="list">
            {order.addons.map((a) => (
              <Line
                key={a.id}
                label={a.name}
                amount={formatPrice(a.price)}
                note={blocked.has(a.id) ? 'Needs a résumé tier' : undefined}
              />
            ))}
          </ul>
        ) : (
          <p className="order-lines__empty">None added</p>
        )}
      </div>
      <p className="order-lines__total">
        <span className="order-lines__heading">Total</span>
        <span className="order-lines__total-amount tabular">{formatPrice(order.total)}</span>
      </p>
    </div>
  )
}

// The signature element (docs/PRD.md §7.2): the order summary styled as a
// résumé being assembled. `mode="build"` carries the Review action; `"review"`
// links back to edit.
export function OrderSheet({ mode = 'build' }) {
  const { state, order, dispatch } = useOrder()
  const headingId = useId()
  const helperId = useId()
  const name = state.details.name.trim()

  return (
    <section className="order-sheet" aria-labelledby={headingId}>
      <header className="order-sheet__letterhead">
        <p className="order-sheet__brand">{site.name}</p>
        <p className="order-sheet__kind">Order sheet</p>
      </header>
      <h2 id={headingId} className="order-sheet__for">
        Order for: <span className={name ? undefined : 'order-sheet__placeholder'}>{name || 'you'}</span>
      </h2>
      <p className="order-sheet__meta">
        Prepared {longDate.format(new Date())}
        {mode === 'build' && !name && ' · Your name is added at review'}
      </p>

      <OrderLines order={order} />

      {/* Announce changes once, in words, rather than re-reading the whole sheet. */}
      <p className="sr-only" aria-live="polite">
        {order.itemCount === 1 ? '1 item' : `${order.itemCount} items`}, total {formatPrice(order.total)}
      </p>

      {mode === 'build' ? (
        <>
          {order.canReview ? (
            <ButtonLink to="/pricing/review" size="lg" arrow className="order-sheet__cta">
              Review order
            </ButtonLink>
          ) : (
            <>
              <button type="button" className="btn btn--primary btn--lg order-sheet__cta" disabled aria-describedby={helperId}>
                Review order
              </button>
              <p id={helperId} className="order-sheet__helper">
                Choose a résumé tier to continue.
              </p>
            </>
          )}
          <div className="order-sheet__foot">
            <span className="order-sheet__guarantee">
              <Award size={16} strokeWidth={1.5} aria-hidden="true" />
              Covered by {site.guarantee.name.replace(/^The /, 'the ')}
            </span>
            {order.itemCount > 0 && (
              <button type="button" className="order-sheet__clear" onClick={() => dispatch({ type: 'reset' })}>
                Clear
              </button>
            )}
          </div>
        </>
      ) : (
        <Link to="/pricing" className="order-sheet__edit">
          Edit order
        </Link>
      )}
    </section>
  )
}
