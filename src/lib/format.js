const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// 569 → "$569", 1048 → "$1,048"
export function formatPrice(amount) {
  return usd.format(amount)
}
