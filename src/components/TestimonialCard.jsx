import './TestimonialCard.css'

// Splits the quote around its pull-phrase so the phrase can be bolded.
function withHighlight(quote, highlight) {
  const at = highlight ? quote.indexOf(highlight) : -1
  if (at === -1) return quote
  return (
    <>
      {quote.slice(0, at)}
      <strong>{highlight}</strong>
      {quote.slice(at + highlight.length)}
    </>
  )
}

export function TestimonialCard({ testimonial }) {
  const { quote, highlight, name, role, isSample } = testimonial
  return (
    <figure className="testimonial-card">
      <span className="testimonial-card__mark" aria-hidden="true">
        “
      </span>
      <blockquote className="testimonial-card__quote">
        <p>{withHighlight(quote, highlight)}</p>
      </blockquote>
      <figcaption className="testimonial-card__by">
        <span className="testimonial-card__name">{name}</span>
        <span className="testimonial-card__role">{role}</span>
        {isSample && <span className="testimonial-card__sample">Sample testimonial</span>}
      </figcaption>
    </figure>
  )
}
