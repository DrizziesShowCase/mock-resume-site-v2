import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { FormField } from '../components/FormField.jsx'
import { OrderSheet } from '../components/OrderSheet.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { useOrder } from '../order/useOrder.js'
import { makeOrderNumber, validateDetails } from '../order/orderState.js'
import './Pricing.css'
import './PricingReview.css'

const fields = [
  { name: 'name', label: 'Full name', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', inputMode: 'email', required: true },
  { name: 'currentTitle', label: 'Current job title', autoComplete: 'organization-title' },
  {
    name: 'targetRole',
    label: 'Role you’re aiming for',
    hint: 'The job you want next, e.g. Head of Operations.',
    required: true,
  },
]

export function PricingReview() {
  const { state, order, dispatch } = useOrder()
  const navigate = useNavigate()
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (state.placed) return <Navigate to="/pricing/confirmation" replace />
  if (!order.canReview) return <Navigate to="/pricing" replace />

  const errors = validateDetails(state.details)
  // Validate on blur, not on every keypress; show everything after a submit attempt.
  const errorFor = (name) => (touched[name] || submitted ? errors[name] : undefined)

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const firstInvalid = fields.find((f) => errors[f.name])
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid.name}`)?.focus()
      return
    }
    dispatch({ type: 'placeOrder', number: makeOrderNumber(), placedAt: new Date().toISOString() })
    navigate('/pricing/confirmation')
  }

  return (
    <>
      <PageMeta title="Review your order" />
      <div className="container pricing">
        <header className="pricing__intro">
          <Link to="/pricing" className="review__back">
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            Back to your order
          </Link>
          <h1 className="pricing__title">Review your order</h1>
          <p className="pricing__lead">Tell us who you are and where you’re headed. Your writer starts from here.</p>
        </header>

        <div className="pricing__grid review__grid">
          <form className="review__form" onSubmit={onSubmit} noValidate>
            <p className="review__demo">
              <Info size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <strong>This is a portfolio demo.</strong> No payment is taken and nothing you enter is sent anywhere.
              </span>
            </p>

            <fieldset className="review__fieldset">
              <legend className="review__legend">Your details</legend>
              {fields.map(({ name, ...field }) => (
                <FormField
                  key={name}
                  id={`field-${name}`}
                  name={name}
                  value={state.details[name]}
                  onChange={(e) => dispatch({ type: 'setDetail', field: name, value: e.target.value })}
                  onBlur={() => setTouched((t) => ({ ...t, [name]: true }))}
                  error={errorFor(name)}
                  {...field}
                />
              ))}
            </fieldset>

            <button type="submit" className="btn btn--primary btn--lg review__submit">
              Place demo order
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="btn__arrow" />
            </button>
          </form>

          <aside className="review__sheet" aria-label="Your order">
            <OrderSheet mode="review" />
          </aside>
        </div>
      </div>
    </>
  )
}
