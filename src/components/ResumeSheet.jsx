import { useId } from 'react'
import './ResumeSheet.css'

// Hero illustration: a résumé on a desk being redlined by an editor. Drawn as
// one SVG so it scales cleanly at every width. Decorative: the hero copy says
// the same thing in words, so it's hidden from assistive tech.
export function ResumeSheet() {
  const shadowId = useId()
  const liftId = useId()
  return (
    <svg className="resume-sheet" viewBox="0 0 574 580" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" style={{ floodColor: 'var(--ink)', floodOpacity: 0.07 }} />
          <feDropShadow dx="0" dy="14" stdDeviation="18" style={{ floodColor: 'var(--ink)', floodOpacity: 0.1 }} />
        </filter>
        <filter id={liftId} x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" style={{ floodColor: 'var(--ink)', floodOpacity: 0.06 }} />
        </filter>
      </defs>

      <rect width="574" height="580" rx="6" style={{ fill: 'var(--paper-shade)' }} />

      {/* The sheet underneath */}
      <rect x="96" y="62" width="392" height="488" transform="rotate(3.2 292 306)" filter={`url(#${liftId})`} style={{ fill: 'var(--paper-bright)' }} />

      {/* The résumé being edited */}
      <g transform="rotate(-1.4 242 290)">
        <rect x="40" y="38" width="404" height="504" filter={`url(#${shadowId})`} style={{ fill: 'var(--paper-bright)' }} />

        <text x="78" y="100" className="resume-sheet__name">
          Maya Okafor
        </text>
        <text x="78" y="120" className="resume-sheet__meta">
          Product Operations Lead · Denver, CO
        </text>
        <line x1="78" y1="136" x2="406" y2="136" strokeWidth="1" style={{ stroke: 'var(--rule-strong)' }} />

        <text x="78" y="160" className="resume-sheet__label">
          SUMMARY
        </text>
        <rect x="78" y="170" width="328" height="6" rx="3" className="resume-sheet__line" />
        <rect x="78" y="183" width="305" height="6" rx="3" className="resume-sheet__line" />
        <rect x="78" y="196" width="200" height="6" rx="3" className="resume-sheet__line" />

        <text x="78" y="232" className="resume-sheet__label">
          EXPERIENCE
        </text>
        <path className="resume-sheet__mark resume-sheet__mark--late" pathLength="1" d="M52 224 57 229 68 216" strokeWidth="2.6" />
        <text x="78" y="254" className="resume-sheet__role">
          Operations Manager, Northwind Health
        </text>
        <text x="406" y="254" textAnchor="end" className="resume-sheet__meta">
          2019–2025
        </text>

        <text x="150" y="284" className="resume-sheet__hand resume-sheet__fade">
          Cut vendor onboarding time 38%
        </text>
        <text x="78" y="306" className="resume-sheet__bullet">
          • Responsible for the vendor onboarding process
        </text>
        <path className="resume-sheet__mark resume-sheet__mark--late" pathLength="1" d="M88 302 L348 301" strokeWidth="1.8" />

        <rect x="78" y="324" width="288" height="6" rx="3" className="resume-sheet__line" />
        <rect x="78" y="337" width="243" height="6" rx="3" className="resume-sheet__line" />
        <rect x="78" y="350" width="266" height="6" rx="3" className="resume-sheet__line" />

        <text x="78" y="388" className="resume-sheet__label">
          EDUCATION
        </text>
        <rect x="78" y="398" width="184" height="6" rx="3" className="resume-sheet__line" />
        <rect x="78" y="411" width="125" height="6" rx="3" className="resume-sheet__line" />

        <text x="78" y="450" className="resume-sheet__label">
          SKILLS
        </text>
        <rect x="78" y="460" width="96" height="6" rx="3" className="resume-sheet__line" />
        <rect x="186" y="460" width="72" height="6" rx="3" className="resume-sheet__line" />
        <rect x="270" y="460" width="110" height="6" rx="3" className="resume-sheet__line" />
        <rect x="78" y="473" width="84" height="6" rx="3" className="resume-sheet__line" />
        <rect x="174" y="473" width="120" height="6" rx="3" className="resume-sheet__line" />
      </g>

      {/* The editor's margin note */}
      <g className="resume-sheet__fade">
        <text x="452" y="222" transform="rotate(-5 452 222)" className="resume-sheet__hand resume-sheet__hand--note">
          quantify it!
        </text>
        <path d="M500 236 C 492 266, 462 288, 404 298" className="resume-sheet__arrow" />
        <path d="M414 290 404 298 415 304" className="resume-sheet__arrow" />
      </g>
    </svg>
  )
}
