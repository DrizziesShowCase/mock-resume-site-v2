import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { site } from '../data/site.js'
import { ButtonLink } from './ButtonLink.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteHeader } from './SiteHeader.jsx'
import './Layout.css'

export function Layout() {
  const { pathname, hash } = useLocation()
  const isFirstRender = useRef(true)

  // On navigation: scroll to the top, or to the anchor when the link carries
  // one (e.g. /why-us#guarantee — the second # survives inside the HashRouter
  // URL). After the first page, also move focus there, so keyboard and screen
  // reader users start at the new content instead of on a link that no
  // longer exists.
  useEffect(() => {
    const moveFocus = !isFirstRender.current
    isFirstRender.current = false
    const land = (target) => {
      const focusTarget = target ?? document.getElementById('main')
      if (moveFocus && focusTarget) {
        if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1')
        focusTarget.focus({ preventScroll: true })
      }
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    }

    const id = hash && decodeURIComponent(hash.slice(1))
    const find = () => (id ? document.getElementById(id) : null)
    if (!id || find()) return land(find())

    // Pages load lazily, so an anchor on a page we just navigated to may not
    // exist yet: start at the top, then land on it as soon as it renders.
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    const observer = new MutationObserver(() => {
      const target = find()
      if (!target) return
      observer.disconnect()
      clearTimeout(giveUp)
      land(target)
    })
    const giveUp = setTimeout(() => {
      observer.disconnect()
      land(null)
    }, 3000)
    if (main) observer.observe(main, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      clearTimeout(giveUp)
    }
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
