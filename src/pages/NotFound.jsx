import { ButtonLink } from '../components/ButtonLink.jsx'
import { PagePlaceholder } from '../components/PagePlaceholder.jsx'

export function NotFound() {
  return (
    <PagePlaceholder
      metaTitle="Page not found"
      eyebrow="404"
      title="This page didn’t make the shortlist."
      lead="The link may be old, or the page may have moved. Try one of these instead."
      actions={
        <>
          <ButtonLink to="/" size="lg" arrow>
            Go to the home page
          </ButtonLink>
          <ButtonLink to="/pricing" size="lg" variant="secondary">
            See pricing
          </ButtonLink>
        </>
      }
    />
  )
}
