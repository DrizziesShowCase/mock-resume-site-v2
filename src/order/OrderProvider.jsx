import { useEffect, useMemo, useReducer } from 'react'
import { initialOrder, orderReducer, selectOrder } from './orderState.js'
import { OrderContext } from './useOrder.js'

const STORAGE_KEY = 'shortlist-order-v1'

// sessionStorage keeps the order through refreshes and back/forward navigation,
// and forgets it when the tab closes. Storage can throw (private mode, blocked
// site data), so every access is guarded and the app works without it.
function loadOrder() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    if (saved && typeof saved === 'object') {
      return { ...initialOrder, ...saved, details: { ...initialOrder.details, ...saved.details } }
    }
  } catch {
    // fall through to a fresh order
  }
  return initialOrder
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, undefined, loadOrder)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage unavailable — the order still works for this page view
    }
  }, [state])

  const value = useMemo(() => ({ state, order: selectOrder(state), dispatch }), [state])
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
