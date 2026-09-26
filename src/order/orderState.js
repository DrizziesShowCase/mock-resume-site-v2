// Pure order logic — no React, no storage — so it can be unit tested directly.
// The total is always derived from the selection, never stored (docs/PRD.md §8).
import { addons } from '../data/addons.js'
import { tiers } from '../data/tiers.js'

export const emptyDetails = { name: '', email: '', currentTitle: '', targetRole: '' }

export const initialOrder = {
  tierId: null,
  addonIds: [],
  details: emptyDetails,
  placed: null, // { number, placedAt } once the demo order is placed
}

const tierById = (id) => tiers.find((t) => t.id === id) ?? null
const addonById = (id) => addons.find((a) => a.id === id) ?? null

export function orderReducer(state, action) {
  switch (action.type) {
    case 'selectTier':
      return tierById(action.tierId) ? { ...state, tierId: action.tierId } : state
    case 'toggleAddon': {
      if (!addonById(action.addonId)) return state
      const has = state.addonIds.includes(action.addonId)
      return {
        ...state,
        addonIds: has ? state.addonIds.filter((id) => id !== action.addonId) : [...state.addonIds, action.addonId],
      }
    }
    case 'addAddon':
      if (!addonById(action.addonId) || state.addonIds.includes(action.addonId)) return state
      return { ...state, addonIds: [...state.addonIds, action.addonId] }
    case 'setDetail':
      return { ...state, details: { ...state.details, [action.field]: action.value } }
    case 'placeOrder':
      if (!state.tierId) return state
      return { ...state, placed: { number: action.number, placedAt: action.placedAt } }
    case 'reset':
      return initialOrder
    default:
      return state
  }
}

// Line items in catalogue order (not click order), so the sheet reads consistently.
export function selectOrder(state) {
  const tier = tierById(state.tierId)
  const chosenAddons = addons.filter((a) => state.addonIds.includes(a.id))
  const total = (tier?.price ?? 0) + chosenAddons.reduce((sum, a) => sum + a.price, 0)
  return {
    tier,
    addons: chosenAddons,
    itemCount: (tier ? 1 : 0) + chosenAddons.length,
    total,
    canReview: Boolean(tier),
    // Add-ons that are built from the résumé but no tier is chosen yet.
    blockedAddons: tier ? [] : chosenAddons.filter((a) => a.requires === 'tier'),
  }
}

// Turns ?tier=…&addon=… (from Home and menu links) into actions. Unknown ids are ignored.
export function actionsFromQuery(searchParams) {
  const actions = []
  const tierId = searchParams.get('tier')
  if (tierId && tierById(tierId)) actions.push({ type: 'selectTier', tierId })
  for (const addonId of searchParams.getAll('addon')) {
    if (addonById(addonId)) actions.push({ type: 'addAddon', addonId })
  }
  return actions
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateDetails(details) {
  const errors = {}
  if (!details.name.trim()) errors.name = 'Enter your name.'
  if (!details.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL.test(details.email.trim())) errors.email = 'Enter an email address like name@example.com.'
  if (!details.targetRole.trim()) errors.targetRole = 'Tell us the role you’re aiming for.'
  return errors
}

// Crockford-style alphabet: no I, L, O or U, so order numbers can't be misread.
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

export function makeOrderNumber(date = new Date(), randomValues = (n) => crypto.getRandomValues(new Uint8Array(n))) {
  const suffix = Array.from(randomValues(4), (b) => ALPHABET[b % ALPHABET.length]).join('')
  return `SL-${date.getFullYear()}-${suffix}`
}
