import { CtaBand } from '../components/CtaBand.jsx'
import { GuaranteeCallout } from '../components/GuaranteeCallout.jsx'
import { Hero } from '../components/Hero.jsx'
import { IncludedStrip } from '../components/IncludedStrip.jsx'
import { LogoStrip } from '../components/LogoStrip.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { ProofBar } from '../components/ProofBar.jsx'
import { Section, SectionHeader } from '../components/Section.jsx'
import { ServiceCard } from '../components/ServiceCard.jsx'
import { TestimonialCard } from '../components/TestimonialCard.jsx'
import { TierCard } from '../components/TierCard.jsx'
import { addons } from '../data/addons.js'
import { testimonials } from '../data/testimonials.js'
import { tiers } from '../data/tiers.js'

const featuredTestimonials = testimonials.slice(0, 3)
const teasedAddons = addons.filter((a) => a.homeBlurb)

export function Home() {
  return (
    <>
      <PageMeta />
      <Hero />
      <ProofBar />

      <Section labelledBy="pricing-title">
        <SectionHeader
          id="pricing-title"
          eyebrow="Pricing"
          title="One résumé, written for where you are."
          lead="Every tier gets the same process and guarantee. What changes is your writer’s seniority and how deep the intake goes."
        />
        <IncludedStrip />
        <div className="tier-grid">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </Section>

      <Section tone="shade" labelledBy="stories-title">
        <SectionHeader id="stories-title" eyebrow="Client stories" title="Recruiters called back. Here’s what clients said." />
        <div className="testimonial-grid">
          {featuredTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Section>

      <Section labelledBy="guarantee-title">
        <GuaranteeCallout />
      </Section>

      <Section tone="shade" labelledBy="addons-title">
        <SectionHeader
          id="addons-title"
          eyebrow="Add-ons"
          title="Everything else your search needs."
          lead="Written by the same writer as your résumé, so every piece tells one story."
        />
        <div className="service-grid">
          {teasedAddons.map((addon) => (
            <ServiceCard key={addon.id} addon={addon} />
          ))}
        </div>
      </Section>

      <Section compact label="Where our clients work">
        <LogoStrip variant="clients" />
      </Section>

      <CtaBand />
    </>
  )
}
