import { createContext, useContext } from 'react'

export const OrderContext = createContext(null)

// { state, order, dispatch } — `order` is the derived view (line items, total).
export function useOrder() {
  const value = useContext(OrderContext)
  if (!value) throw new Error('useOrder must be used inside <OrderProvider>')
  return value
}
