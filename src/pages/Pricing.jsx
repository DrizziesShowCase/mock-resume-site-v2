import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Info } from 'lucide-react'
import { AddonOption } from '../components/AddonOption.jsx'
import { Eyebrow } from '../components/Eyebrow.jsx'
import { IncludedStrip } from '../components/IncludedStrip.jsx'
import { OrderBar } from '../components/OrderBar.jsx'
import { OrderSheet } from '../components/OrderSheet.jsx'
import { PageMeta } from '../components/PageMeta.jsx'
import { TierOption } from '../components/TierOption.jsx'
import { addons } from '../data/addons.js'
import { tiers } from '../data/tiers.js'
import { useOrder } from '../order/useOrder.js'
import { actionsFromQuery } from '../order/orderState.js'
import './Pricing.css'

export function Pricing() {
  const { state, order, dispatch } = useOrder()
  const [searchParams, setSearchParams] = useSearchParams()

  // Sync from the URL: links like /pricing?tier=executive&addon=linkedin
  // preselect options, then the params are dropped so a refresh doesn't
  // re-apply them. Arriving after a placed demo order starts a fresh one.
  useEffect(() => {
    if (state.placed) dispatch({ type: 'reset' })
    const actions = actionsFromQuery(searchParams)
    if (actions.length === 0 && searchParams.size === 0) return
    actions.forEach(dispatch)
    setSearchParams({}, { replace: true })
  }, [searchParams, setSearchParams, state.placed, dispatch])

  return (
    <>
      <PageMeta
        title="Build your order"
        description="Choose a résumé tier, add a cover letter, LinkedIn or interview prep, and see your total as you go."
      />
      <div className="container pricing">
        <header className="pricing__intro">
          <h1 className="pricing__title">Build your order</h1>
          <p className="pricing__lead">
            Pick a résumé tier, add anything else you need, and review everything before it’s final.
          </p>
        </header>

        <div className="pricing__grid">
          <div className="pricing__steps">
            <section className="pricing__step" aria-labelledby="step-tier">
              <Eyebrow>Step 01</Eyebrow>
              <h2 id="step-tier" className="pricing__step-title">
                Choose your résumé
              </h2>
              <IncludedStrip />
              <fieldset className="option-group">
                <legend className="sr-only">Résumé tier (choose one)</legend>
                <div className="tier-options">
                  {tiers.map((tier) => (
                    <TierOption
                      key={tier.id}
                      tier={tier}
                      checked={state.tierId === tier.id}
                      onSelect={(tierId) => dispatch({ type: 'selectTier', tierId })}
                    />
                  ))}
                </div>
              </fieldset>
            </section>

            <section className="pricing__step" aria-labelledby="step-addons">
              <Eyebrow>Step 02</Eyebrow>
              <h2 id="step-addons" className="pricing__step-title">
                Add services <span className="pricing__optional">Optional</span>
              </h2>
              <fieldset className="option-group">
                <legend className="sr-only">Add-on services (choose any)</legend>
                <div className="addon-options">
                  {addons.map((addon) => (
                    <AddonOption
                      key={addon.id}
                      addon={addon}
                      checked={state.addonIds.includes(addon.id)}
                      onToggle={(addonId) => dispatch({ type: 'toggleAddon', addonId })}
                    />
                  ))}
                </div>
              </fieldset>
              <div role="status">
                {order.blockedAddons.length > 0 && (
                  <p className="pricing__note">
                    <Info size={18} strokeWidth={1.75} aria-hidden="true" />
                    <span>
                      {order.blockedAddons.map((a) => a.name).join(' and ')} is written from your new résumé. Pick a tier
                      in Step 01 to include it.
                    </span>
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="pricing__sheet" aria-label="Your order">
            <OrderSheet />
          </aside>
        </div>
      </div>
      <OrderBar />
    </>
  )
}
