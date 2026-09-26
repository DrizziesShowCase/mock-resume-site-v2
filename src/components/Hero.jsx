import { tiers } from '../data/tiers.js'
import { formatPrice } from '../lib/format.js'
import { ButtonLink } from './ButtonLink.jsx'
import { Eyebrow } from './Eyebrow.jsx'
import { ResumeSheet } from './ResumeSheet.jsx'
import './Hero.css'

const startingPrice = Math.min(...tiers.map((t) => t.price))

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <Eyebrow>Résumé &amp; career writing</Eyebrow>
          <h1 id="hero-title" className="hero__title">
            Get on the{' '}
            <span className="hero__underlined">
              shortlist
              <svg className="hero__underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path className="redline-draw" pathLength="1" d="M4 13 C 60 5, 140 17, 200 9 S 280 7, 296 11" strokeWidth="4" />
              </svg>
            </span>
            .
          </h1>
          <p className="hero__lead">
            A certified writer interviews you, then rewrites your experience into a résumé recruiters actually call
            back. Written by a person, never a template.
          </p>
          <div className="hero__actions">
            <ButtonLink to="/pricing" size="lg" arrow>
              Build your order
            </ButtonLink>
            <ButtonLink to="/process" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <p className="hero__fine">
            From <strong className="tabular">{formatPrice(startingPrice)}</strong> · Two revision rounds · Word + PDF files
          </p>
        </div>
        <div className="hero__art">
          <ResumeSheet />
        </div>
      </div>
    </section>
  )
}
