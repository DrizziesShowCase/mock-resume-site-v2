import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { primaryNav, servicesMenu } from '../data/nav.js'
import { site } from '../data/site.js'
import { ButtonLink } from './ButtonLink.jsx'
import { Logo } from './Logo.jsx'
import './MobileNav.css'

// Full-height menu sheet for small screens. A modal <dialog> gives us focus
// trapping, Esc-to-close and an inert background for free.
export function MobileNav() {
  const dialogRef = useRef(null)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesId = useId()
  const { pathname, search } = useLocation()

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  useEffect(() => {
    close()
  }, [pathname, search])

  // Following any link inside the sheet closes it, even when the route is unchanged.
  const onClick = (e) => {
    if (e.target.closest('a')) close()
  }

  return (
    <>
      <button type="button" className="mobile-nav__toggle" aria-label="Open menu" onClick={open}>
        <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>

      <dialog ref={dialogRef} className="mobile-nav" aria-label="Menu" onClick={onClick} onClose={() => setServicesOpen(false)}>
        <div className="mobile-nav__top container">
          <Logo />
          <button type="button" className="mobile-nav__toggle" aria-label="Close menu" onClick={close}>
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Main" className="mobile-nav__body container">
          <ul role="list">
            {primaryNav.map((item) =>
              item.menu ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className="mobile-nav__link"
                    aria-expanded={servicesOpen}
                    aria-controls={servicesId}
                    onClick={() => setServicesOpen((o) => !o)}
                  >
                    {item.label}
                    <ChevronDown className="mobile-nav__chevron" size={20} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                  <div id={servicesId} className="mobile-nav__sub" hidden={!servicesOpen}>
                    {servicesMenu
                      .filter((group) => !group.phone)
                      .map((group) => (
                        <div key={group.heading}>
                          <p className="mobile-nav__sub-heading">{group.heading}</p>
                          <ul role="list">
                            {group.links.map((link) => (
                              <li key={link.to}>
                                <NavLink to={link.to} className="mobile-nav__sub-link">
                                  {link.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} className="mobile-nav__link">
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="mobile-nav__footer container">
          <ButtonLink href={site.phone.href} variant="secondary">
            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
            Call a writer
          </ButtonLink>
          <ButtonLink to="/pricing" arrow>
            Get started
          </ButtonLink>
        </div>
      </dialog>
    </>
  )
}
