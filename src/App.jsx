import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Faq } from './pages/Faq.jsx'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Pricing } from './pages/Pricing.jsx'
import { PricingConfirmation } from './pages/PricingConfirmation.jsx'
import { PricingReview } from './pages/PricingReview.jsx'
import { Process } from './pages/Process.jsx'
import { WhyUs } from './pages/WhyUs.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="pricing/review" element={<PricingReview />} />
        <Route path="pricing/confirmation" element={<PricingConfirmation />} />
        <Route path="why-us" element={<WhyUs />} />
        <Route path="process" element={<Process />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
