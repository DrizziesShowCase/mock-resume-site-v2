import { Award, Briefcase, Clock, FileText, IdCard, LayoutGrid, Mail, MessagesSquare, TrendingUp, UserRound } from 'lucide-react'

// Maps the icon names stored in src/data/ to lucide components. Listing them
// explicitly (instead of importing all of lucide) keeps the bundle small.
const icons = { Award, Briefcase, Clock, FileText, IdCard, LayoutGrid, Mail, MessagesSquare, TrendingUp, UserRound }

export function Icon({ name, size = 24, strokeWidth = 1.5, ...rest }) {
  const Component = icons[name]
  if (!Component) return null
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}
