import { Link } from 'react-router-dom'
import { footerColumns } from '../data/nav.js'
import { site } from '../data/site.js'
import { GuaranteeSeal } from './GuaranteeSeal.jsx'
import { Logo } from './Logo.jsx'
import './SiteFooter.css'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo onInk />
            <p className="site-footer__tagline">{site.tagline}</p>
            <div className="site-footer__guarantee">
              <GuaranteeSeal size={56} />
              <p>
                <strong>{site.guarantee.name}</strong>
                <br />
                {site.guarantee.short}
              </p>
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="site-footer__col">
              <h2 className="site-footer__heading">{col.heading}</h2>
              <ul role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} className="site-footer__link tabular">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="site-footer__link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p>{site.disclaimer}</p>
          <p>
            <a href={`mailto:${site.email}`} className="site-footer__link">
              {site.email}
            </a>
            <span aria-hidden="true"> · </span>© {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
