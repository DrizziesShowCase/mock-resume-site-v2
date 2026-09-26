import { Check, Minus } from 'lucide-react'
import { site } from '../data/site.js'
import './ComparisonTable.css'

const US = site.shortName
const THEM = 'Typical résumé mills'

// A real <table>. Below 720px CSS restacks each row as a card; the explicit
// ARIA roles keep table semantics, which some browsers drop once a table's
// display is changed.
export function ComparisonTable({ rows }) {
  return (
    <table className="compare" role="table">
      <caption className="sr-only">
        {US} compared with {THEM.toLowerCase()}
      </caption>
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader" scope="col">
            <span className="sr-only">Feature</span>
          </th>
          <th role="columnheader" scope="col" className="compare__us-head">
            {US}
          </th>
          <th role="columnheader" scope="col">
            {THEM}
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((row) => (
          <tr key={row.feature} role="row">
            <th role="rowheader" scope="row" className="compare__feature">
              {row.feature}
            </th>
            <td role="cell" className="compare__us" data-label={US}>
              <Check size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>{row.us}</span>
            </td>
            <td role="cell" className="compare__them" data-label={THEM}>
              <Minus size={18} strokeWidth={2} aria-hidden="true" />
              <span>{row.them}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
