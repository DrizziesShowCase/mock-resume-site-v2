import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Home } from './pages/Home.jsx'

// Home ships in the main bundle; every other page is its own chunk, fetched on
// first visit. Keeps the first load light on slow phones.
const page = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })))
const Pricing = page(() => import('./pages/Pricing.jsx'), 'Pricing')
const PricingReview = page(() => import('./pages/PricingReview.jsx'), 'PricingReview')
const PricingConfirmation = page(() => import('./pages/PricingConfirmation.jsx'), 'PricingConfirmation')
const WhyUs = page(() => import('./pages/WhyUs.jsx'), 'WhyUs')
const Process = page(() => import('./pages/Process.jsx'), 'Process')
const Faq = page(() => import('./pages/Faq.jsx'), 'Faq')
const NotFound = page(() => import('./pages/NotFound.jsx'), 'NotFound')

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Lazy page={Pricing} />} />
        <Route path="pricing/review" element={<Lazy page={PricingReview} />} />
        <Route path="pricing/confirmation" element={<Lazy page={PricingConfirmation} />} />
        <Route path="why-us" element={<Lazy page={WhyUs} />} />
        <Route path="process" element={<Lazy page={Process} />} />
        <Route path="faq" element={<Lazy page={Faq} />} />
        <Route path="*" element={<Lazy page={NotFound} />} />
      </Route>
    </Routes>
  )
}

// A page-height placeholder while a chunk loads, so the footer doesn't jump up
// and back down.
function Lazy({ page: Page }) {
  return (
    <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
      <Page />
    </Suspense>
  )
}
