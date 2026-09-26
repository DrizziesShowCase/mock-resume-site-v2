import { useRef } from 'react'
import { ChevronUp, X } from 'lucide-react'
import { formatPrice } from '../lib/format.js'
import { useOrder } from '../order/useOrder.js'
import { ButtonLink } from './ButtonLink.jsx'
import { OrderSheet } from './OrderSheet.jsx'
import './OrderBar.css'

// Small screens only: a sticky summary bar that opens the full Order Sheet in
// a bottom sheet (a modal <dialog>, so focus and Esc are handled natively).
export function OrderBar() {
  const { order } = useOrder()
  const dialogRef = useRef(null)
  const items = order.itemCount === 1 ? '1 item' : `${order.itemCount} items`

  return (
    <>
      <div className="order-bar">
        <button type="button" className="order-bar__summary" onClick={() => dialogRef.current?.showModal()}>
          <span className="order-bar__items">{items}</span>
          <span className="order-bar__total tabular">{formatPrice(order.total)}</span>
          <ChevronUp size={18} strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">— view order sheet</span>
        </button>
        {order.canReview ? (
          <ButtonLink to="/pricing/review" arrow>
            Review
          </ButtonLink>
        ) : (
          <button type="button" className="btn btn--primary order-bar__disabled" disabled>
            Review
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="order-bar__sheet"
        aria-label="Your order"
        onClick={(e) => {
          // Close on backdrop clicks and when following a link inside the sheet.
          if (e.target === e.currentTarget || e.target.closest('a')) dialogRef.current?.close()
        }}
      >
        <div className="order-bar__sheet-inner">
          <button type="button" className="order-bar__close" aria-label="Close order sheet" onClick={() => dialogRef.current?.close()}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <OrderSheet />
        </div>
      </dialog>
    </>
  )
}
