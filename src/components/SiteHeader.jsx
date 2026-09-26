import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { primaryNav } from '../data/nav.js'
import { site } from '../data/site.js'
import { ButtonLink } from './ButtonLink.jsx'
import { Logo } from './Logo.jsx'
import { MobileNav } from './MobileNav.jsx'
import { ServicesMenu } from './ServicesMenu.jsx'
import './SiteHeader.css'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  // The header lifts off the page once content scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <div className="container site-header__inner">
        <Logo />
        <nav aria-label="Main" className="site-header__nav">
          <ul role="list" className="site-header__links">
            {primaryNav.map((item) => (
              <li key={item.label}>
                {item.menu ? (
                  <ServicesMenu label={item.label} />
                ) : (
                  <NavLink to={item.to} className="site-header__link">
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <a href={site.phone.href} className="site-header__phone tabular">
          <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
          {site.phone.display}
        </a>
        <ButtonLink to="/pricing" arrow className="site-header__cta">
          Get started
        </ButtonLink>
        <div className="site-header__mobile">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
