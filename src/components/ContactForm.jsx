import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { contactTopics } from '../data/contact.js'
import { emptyContact, validateContact } from '../lib/contactForm.js'
import { FormField } from './FormField.jsx'
import './ContactForm.css'

const order = ['name', 'email', 'topic', 'message']

// Demo contact form: validates like a real one, then shows a success message.
// Nothing is sent anywhere.
export function ContactForm() {
  const [values, setValues] = useState(emptyContact)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sentTo, setSentTo] = useState(null)
  const successRef = useRef(null)

  // Move focus to the confirmation so keyboard and screen reader users hear it.
  useEffect(() => {
    if (sentTo) successRef.current?.focus()
  }, [sentTo])

  const errors = validateContact(values)
  const errorFor = (name) => (touched[name] || submitted ? errors[name] : undefined)
  const field = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    error: errorFor(name),
    required: true,
  })

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const firstInvalid = order.find((name) => errors[name])
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }
    setSentTo(values.name.trim().split(/\s+/)[0])
  }

  const reset = () => {
    setValues(emptyContact)
    setTouched({})
    setSubmitted(false)
    setSentTo(null)
  }

  if (sentTo) {
    return (
      <div className="contact-form contact-form--sent" role="status">
        <CheckCircle2 size={32} strokeWidth={1.5} aria-hidden="true" className="contact-form__done-icon" />
        <h3 ref={successRef} tabIndex={-1} className="contact-form__done-title">
          Thanks, {sentTo}. Message received.
        </h3>
        <p className="contact-form__done-text">
          In the real service, a writer would reply within one business day. This is a portfolio demo, so nothing
          was sent.
        </p>
        <button type="button" className="btn btn--secondary" onClick={reset}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="contact-form__title">
        Send a message
      </h3>
      <div className="contact-form__row">
        <FormField label="Name" autoComplete="name" {...field('name')} />
        <FormField label="Email" type="email" inputMode="email" autoComplete="email" {...field('email')} />
      </div>
      <FormField as="select" label="What’s it about?" {...field('topic')}>
        <option value="" disabled>
          Choose a topic
        </option>
        {contactTopics.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </FormField>
      <FormField as="textarea" label="Message" rows={5} {...field('message')} />
      <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
        Send message
        <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="btn__arrow" />
      </button>
      <p className="contact-form__note">Demo form: nothing you type leaves this page.</p>
    </form>
  )
}
