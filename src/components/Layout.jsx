import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { site } from '../data/site.js'
import { ButtonLink } from './ButtonLink.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteHeader } from './SiteHeader.jsx'
import './Layout.css'

export function Layout() {
  const { pathname, hash } = useLocation()

  // Scroll to the top on navigation, or to the anchor when the link carries one
  // (e.g. /why-us#guarantee — the second # survives inside the HashRouter URL).
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  // The order flow has its own sticky summary bar on mobile.
  const showActionBar = !pathname.startsWith('/pricing')

  // A plain href="#main" would be read by HashRouter as a route, so the skip
  // link moves focus itself.
  const skipToMain = (e) => {
    e.preventDefault()
    const main = document.getElementById('main')
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <div className={`layout${showActionBar ? ' layout--action-bar' : ''}`}>
      <a href="#main" className="skip-link" onClick={skipToMain}>
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="layout__main">
        <Outlet />
      </main>
      <SiteFooter />
      {showActionBar && (
        <div className="action-bar">
          <ButtonLink href={site.phone.href} variant="secondary">
            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
            Call a writer
          </ButtonLink>
          <ButtonLink to="/pricing" arrow>
            Get started
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
