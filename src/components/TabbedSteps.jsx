import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Timeline } from './Timeline.jsx'
import './TabbedSteps.css'

// WAI-ARIA tabs (automatic activation): arrow keys, Home and End move between
// tabs; only the active tab is in the tab order. The active tab lives in the
// URL (?tab=linkedin) so footer and step links can deep-link to it.
export function TabbedSteps({ tabs, label }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabRefs = useRef({})
  const requested = searchParams.get('tab')
  const active = tabs.find((t) => t.id === requested) ?? tabs[0]

  const select = (tab, moveFocus = false) => {
    setSearchParams(tab.id === tabs[0].id ? {} : { tab: tab.id }, { replace: true, preventScrollReset: true })
    if (moveFocus) tabRefs.current[tab.id]?.focus()
  }

  const onKeyDown = (e) => {
    // Move relative to the tab that has focus, not the one in the URL: the URL
    // updates a beat after focus moves, so quick key presses would otherwise
    // start from a stale tab.
    const focused = tabs.findIndex((t) => tabRefs.current[t.id] === e.target)
    const index = focused === -1 ? tabs.indexOf(active) : focused
    const moves = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }
    if (!(e.key in moves)) return
    e.preventDefault()
    select(tabs[moves[e.key]], true)
  }

  return (
    <div className="tabbed-steps">
      <div role="tablist" aria-label={label} className="tabbed-steps__list" onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const selected = tab.id === active.id
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className="tabbed-steps__tab"
              onClick={() => select(tab)}
            >
              {tab.label}
              <span className="tabbed-steps__count tabular" aria-hidden="true">
                {tab.steps.length}
              </span>
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className="tabbed-steps__panel"
        key={active.id}
      >
        <h2 className="tabbed-steps__heading">{active.heading}</h2>
        <Timeline steps={active.steps} />
      </div>
    </div>
  )
}
