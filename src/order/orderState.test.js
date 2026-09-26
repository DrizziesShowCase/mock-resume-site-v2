import { describe, expect, it } from 'vitest'
import { actionsFromQuery, initialOrder, makeOrderNumber, orderReducer, selectOrder, validateDetails } from './orderState.js'

const run = (...actions) => actions.reduce(orderReducer, initialOrder)

describe('orderReducer', () => {
  it('selects exactly one tier, replacing the previous choice', () => {
    const state = run({ type: 'selectTier', tierId: 'early' }, { type: 'selectTier', tierId: 'executive' })
    expect(state.tierId).toBe('executive')
  })

  it('ignores unknown tiers and add-ons', () => {
    const state = run({ type: 'selectTier', tierId: 'platinum' }, { type: 'toggleAddon', addonId: 'nope' })
    expect(state).toEqual(initialOrder)
  })

  it('toggles add-ons on and off', () => {
    const on = run({ type: 'toggleAddon', addonId: 'cover' })
    expect(on.addonIds).toEqual(['cover'])
    expect(orderReducer(on, { type: 'toggleAddon', addonId: 'cover' }).addonIds).toEqual([])
  })

  it('addAddon is idempotent (safe to replay from the URL)', () => {
    const state = run({ type: 'addAddon', addonId: 'cover' }, { type: 'addAddon', addonId: 'cover' })
    expect(state.addonIds).toEqual(['cover'])
  })

  it('will not place an order without a tier', () => {
    const state = run({ type: 'placeOrder', number: 'SL-2026-AAAA', placedAt: '2026-09-26' })
    expect(state.placed).toBeNull()
  })

  it('places an order and resets back to empty', () => {
    const placed = run(
      { type: 'selectTier', tierId: 'professional' },
      { type: 'placeOrder', number: 'SL-2026-AAAA', placedAt: '2026-09-26' },
    )
    expect(placed.placed).toEqual({ number: 'SL-2026-AAAA', placedAt: '2026-09-26' })
    expect(orderReducer(placed, { type: 'reset' })).toEqual(initialOrder)
  })
})

describe('selectOrder', () => {
  it('totals the tier and add-ons', () => {
    const state = run(
      { type: 'selectTier', tierId: 'professional' },
      { type: 'toggleAddon', addonId: 'cover' },
      { type: 'toggleAddon', addonId: 'thanks' },
    )
    const order = selectOrder(state)
    expect(order.total).toBe(569 + 179 + 99)
    expect(order.itemCount).toBe(3)
    expect(order.canReview).toBe(true)
  })

  it('lists add-ons in catalogue order regardless of click order', () => {
    const state = run({ type: 'toggleAddon', addonId: 'thanks' }, { type: 'toggleAddon', addonId: 'cover' })
    expect(selectOrder(state).addons.map((a) => a.id)).toEqual(['cover', 'thanks'])
  })

  it('flags LinkedIn when no résumé tier is chosen, and blocks review', () => {
    const order = selectOrder(run({ type: 'toggleAddon', addonId: 'linkedin' }))
    expect(order.blockedAddons.map((a) => a.id)).toEqual(['linkedin'])
    expect(order.canReview).toBe(false)
    expect(order.total).toBe(189)
  })

  it('clears the LinkedIn flag once a tier is chosen', () => {
    const state = run({ type: 'toggleAddon', addonId: 'linkedin' }, { type: 'selectTier', tierId: 'early' })
    expect(selectOrder(state).blockedAddons).toEqual([])
  })
})

describe('actionsFromQuery', () => {
  it('turns tier and addon params into actions, skipping unknown ids', () => {
    const params = new URLSearchParams('tier=executive&addon=linkedin&addon=bogus')
    expect(actionsFromQuery(params)).toEqual([
      { type: 'selectTier', tierId: 'executive' },
      { type: 'addAddon', addonId: 'linkedin' },
    ])
  })

  it('returns nothing for an empty query', () => {
    expect(actionsFromQuery(new URLSearchParams(''))).toEqual([])
  })
})

describe('validateDetails', () => {
  const valid = { name: 'Maya Okafor', email: 'maya@example.com', currentTitle: '', targetRole: 'Head of Operations' }

  it('accepts complete details (current title is optional)', () => {
    expect(validateDetails(valid)).toEqual({})
  })

  it('requires name, email and target role', () => {
    const errors = validateDetails({ name: ' ', email: '', currentTitle: '', targetRole: '' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'name', 'targetRole'])
  })

  it('rejects malformed email addresses', () => {
    expect(validateDetails({ ...valid, email: 'maya@example' }).email).toMatch(/email address like/)
  })
})

describe('makeOrderNumber', () => {
  it('formats SL-<year>-<4 chars> from an unambiguous alphabet', () => {
    const number = makeOrderNumber(new Date('2026-09-26T12:00:00'), () => [0, 10, 31, 255])
    expect(number).toBe('SL-2026-0AZZ')
  })

  it('produces a well-formed number with real randomness', () => {
    expect(makeOrderNumber()).toMatch(/^SL-\d{4}-[0-9A-HJKMNP-TV-Z]{4}$/)
  })
})
