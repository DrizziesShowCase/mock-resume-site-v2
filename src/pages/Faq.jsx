import { Clock, Mail, Phone } from 'lucide-react'
import { ContactForm } from '../components/ContactForm.jsx'
import { FaqAccordion } from '../components/FaqAccordion.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { Section, SectionHeader } from '../components/Section.jsx'
import { responseTime } from '../data/contact.js'
import { faqGroups } from '../data/faq.js'
import { site } from '../data/site.js'
import './Faq.css'

export function Faq() {
  return (
    <>
      <PageMeta
        title="FAQ & contact"
        description="Answers about tiers, timing and the Shortlist Guarantee, and how to reach a writer."
      />
      <PageIntro
        eyebrow="Help"
        title="Questions, answered"
        lead="Tiers, timing, the guarantee, and how to reach a writer. Can’t find it here? Send us a message below."
      />

      <Section compact label="Frequently asked questions">
        <FaqAccordion groups={faqGroups} />
      </Section>

      <Section id="contact" tone="shade" labelledBy="contact-title">
        <div className="contact">
          <div className="contact__intro">
            <SectionHeader id="contact-title" eyebrow="Contact" title="Talk to a writer." />
            <p className="contact__lead">{responseTime} Prefer to talk it through? Call us.</p>
            <ul role="list" className="contact__details">
              <li>
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                <a href={site.phone.href} className="tabular">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Clock size={20} strokeWidth={1.5} aria-hidden="true" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  )
}
