// Brass-on-ink seal for the Shortlist Guarantee. Decorative: always pair it
// with visible guarantee text, which is why it is hidden from screen readers.
export function GuaranteeSeal({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="var(--ink)" stroke="var(--brass)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="var(--brass)" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
      <text x="32" y="35" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="19" fontWeight="600" fill="var(--brass)">
        60
      </text>
      <text x="32" y="45" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="5.5" fontWeight="700" letterSpacing="1.2" fill="var(--brass)">
        DAYS
      </text>
    </svg>
  )
}
