import { AlertCircle } from 'lucide-react'
import './FormField.css'

// Label above, hint and error below, all wired up with aria-describedby.
// Errors pair color with an icon and text, never color alone.
export function FormField({ id, label, hint, error, required = false, ...inputProps }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
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
      <input
        id={id}
        className="form-field__input"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="form-field__error">
          <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
