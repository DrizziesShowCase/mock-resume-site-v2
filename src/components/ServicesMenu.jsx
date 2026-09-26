import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Phone } from 'lucide-react'
import { servicesMenu } from '../data/nav.js'
import { site } from '../data/site.js'
import './ServicesMenu.css'

const HOVER_INTENT_MS = 150

// Disclosure-style mega menu (not role="menu": these are site links, per the
// WAI-ARIA disclosure navigation pattern). Opens on click, or on hover after a
// short intent delay; Esc closes and returns focus to the trigger.
export function ServicesMenu({ label }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)
  const hoverTimer = useRef()

  // While open: a click outside closes it, and Esc closes it from anywhere on
  // the page (a hover-opened menu never receives focus), returning focus to
  // the trigger.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const scheduleHover = (next) => (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(next), HOVER_INTENT_MS)
  }

  const onBlur = (e) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) setOpen(false)
  }

  return (
    <div
      ref={wrapperRef}
      className="services-menu"
      onPointerEnter={scheduleHover(true)}
      onPointerLeave={scheduleHover(false)}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className="site-header__link"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearTimeout(hoverTimer.current)
          setOpen((o) => !o)
        }}
      >
        {label}
        <ChevronDown className="services-menu__chevron" size={14} strokeWidth={2} aria-hidden="true" />
      </button>

      {/* Following any link in the panel closes it, even when the route is unchanged. */}
      <div
        id={panelId}
        className="services-menu__panel"
        hidden={!open}
        onClick={(e) => {
          if (e.target.closest('a')) setOpen(false)
        }}
      >
        <div className="container services-menu__grid">
          {servicesMenu.map((group) => (
            <section key={group.heading} aria-label={group.heading}>
              <h2 className="services-menu__heading">{group.heading}</h2>
              <ul role="list" className={`services-menu__list${group.links.length > 4 ? ' services-menu__list--two' : ''}`}>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="services-menu__link">
                      <span className="services-menu__label">{link.label}</span>
                      <span className="services-menu__meta">{link.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {group.phone && (
                <div className="services-menu__call">
                  <p>Talk it through with a writer.</p>
                  <a href={site.phone.href} className="services-menu__phone tabular">
                    <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
                    {site.phone.display}
                  </a>
                  <p className="services-menu__hours">{site.hours}</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
