import { site } from '../data/site.js'

// Per-route <title> and meta description. React 19 hoists these into <head>.
export function PageMeta({ title, description = site.description }) {
  const fullTitle = title ? `${title} | ${site.shortName}` : `${site.name} — Professional résumé writing`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </>
  )
}
