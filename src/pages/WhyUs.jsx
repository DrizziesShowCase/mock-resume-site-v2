import { ComparisonTable } from '../components/ComparisonTable.jsx'
import { CtaBand } from '../components/CtaBand.jsx'
import { GuaranteeTerms } from '../components/GuaranteeTerms.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { Section, SectionHeader } from '../components/Section.jsx'
import { ValuePropGrid } from '../components/ValuePropGrid.jsx'
import { comparison } from '../data/comparison.js'
import { valueProps } from '../data/valueProps.js'

export function WhyUs() {
  return (
    <>
      <PageMeta
        title="Why Shortlist"
        description="Certified writers, a live intake call, résumés written from scratch, and interviews within 60 days or a free rewrite."
      />
      <PageIntro
        eyebrow="Why Shortlist"
        title="Written by a person, never a template."
        lead="Most résumé services fill in a form and reformat what you already had. We start with a conversation, find the results your current résumé leaves out, and write for the role you want next."
      />

      <Section compact label="What you get">
        <ValuePropGrid items={valueProps} />
      </Section>

      <Section tone="shade" labelledBy="compare-title">
        <SectionHeader
          id="compare-title"
          eyebrow="How we compare"
          title="The difference is in the process."
          lead="Price is easy to compare. What you get for it is not, so here it is side by side."
        />
        <ComparisonTable rows={comparison} />
      </Section>

      <Section id="guarantee" labelledBy="guarantee-title">
        <GuaranteeTerms />
      </Section>

      <CtaBand />
    </>
  )
}
