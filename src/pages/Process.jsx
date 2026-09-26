import { CtaBand } from '../components/CtaBand.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { Section } from '../components/Section.jsx'
import { TabbedSteps } from '../components/TabbedSteps.jsx'
import { processTabs } from '../data/process.js'

export function Process() {
  return (
    <>
      <PageMeta
        title="Our process"
        description="Every step from order to final files, for résumés, cover letters, LinkedIn, interview prep and career coaching."
      />
      <PageIntro
        eyebrow="Our process"
        title="From first call to final files"
        lead="No templates and no guesswork: every service starts with what you’ve actually done and where you want to go. Pick a service to see its steps."
      />
      <Section compact label="Steps by service">
        <TabbedSteps tabs={processTabs} label="Services" />
      </Section>
      <CtaBand title="Ready when you are." />
    </>
  )
}
