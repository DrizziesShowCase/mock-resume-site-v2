import { AlertCircle, ChevronDown } from 'lucide-react'
import './FormField.css'

// Label above, hint and error below, all wired up with aria-describedby.
// Errors pair color with an icon and text, never color alone.
// `as` picks the control: 'input' (default), 'textarea' or 'select' (pass <option>s as children).
export function FormField({ id, label, hint, error, required = false, as = 'input', children, ...controlProps }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const Control = as
  return (
    <div className={`form-field${error ? ' form-field--error' : ''}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
        {!required && <span className="form-field__optional"> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}
      <div className={`form-field__control form-field__control--${as}`}>
        <Control
          id={id}
          className="form-field__input"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...controlProps}
        >
          {children}
        </Control>
        {as === 'select' && <ChevronDown className="form-field__chevron" size={18} strokeWidth={1.75} aria-hidden="true" />}
      </div>
      {error && (
        <p id={errorId} className="form-field__error">
          <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
