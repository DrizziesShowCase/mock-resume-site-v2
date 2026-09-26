import { describe, expect, it } from 'vitest'
import { emptyContact, validateContact } from './contactForm.js'
import { isEmail } from './validation.js'

describe('validateContact', () => {
  const valid = { name: 'Daniel R.', email: 'daniel@example.com', topic: 'choosing', message: 'Which tier fits a new grad?' }

  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('flags every field on an empty form', () => {
    expect(Object.keys(validateContact(emptyContact)).sort()).toEqual(['email', 'message', 'name', 'topic'])
  })

  it('rejects topics that are not in the list', () => {
    expect(validateContact({ ...valid, topic: 'refund-now' }).topic).toBeDefined()
  })

  it('asks for a message longer than a few characters', () => {
    expect(validateContact({ ...valid, message: '  hi  ' }).message).toMatch(/at least 10/)
  })
})

describe('isEmail', () => {
  it.each([
    ['maya@example.com', true],
    ['  maya@example.com  ', true],
    ['maya@example', false],
    ['maya example.com', false],
    ['', false],
  ])('%j → %s', (value, expected) => {
    expect(isEmail(value)).toBe(expected)
  })
})
