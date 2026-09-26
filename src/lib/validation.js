// Deliberately loose: one @, something on each side, a dot in the domain.
// Real deliverability can only be proven by sending mail, which this demo never does.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isEmail(value) {
  return EMAIL.test(value.trim())
}

// Shared messages so both forms word the same problem the same way.
export function emailError(value) {
  if (!value.trim()) return 'Enter your email address.'
  if (!isEmail(value)) return 'Enter an email address like name@example.com.'
  return undefined
}
