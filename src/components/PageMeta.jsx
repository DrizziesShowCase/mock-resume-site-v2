import { useEffect } from 'react'
import { site } from '../data/site.js'

export const defaultTitle = `${site.name} — Professional résumé writing`

// Per-route title and meta description. index.html ships one static <title>
// and description so the page is never untitled while JavaScript (or a lazily
// loaded page) is still arriving; this updates those same elements in place
// rather than adding second copies.
export function PageMeta({ title, description = site.description }) {
  const fullTitle = title ? `${title} | ${site.shortName}` : defaultTitle
  useEffect(() => {
    document.title = fullTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [fullTitle, description])
  return null
}
