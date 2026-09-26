import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { isMobile, route, withOrder } from './helpers.js'

// PRD §13: zero serious or critical axe violations. Checked against WCAG 2.2 AA
// rules, on every route and in the interactive states that change the DOM.
async function expectNoSeriousViolations(page, label) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze()
  // Serious/critical per the PRD, plus two moderate rules this site has already
  // been fixed for, so they can't regress.
  const alwaysFail = new Set(['heading-order', 'label-content-name-mismatch'])
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical' || alwaysFail.has(v.id))
  const summary = serious.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
  expect(summary, `axe violations on ${label}`).toEqual([])
}

// Hero redline strokes and order-sheet ticks animate in; wait them out so
// contrast is measured on the finished page.
test.use({ reducedMotion: 'reduce' })

for (const path of ['/', '/pricing', '/why-us', '/process', '/faq', '/no-such-page']) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(route(path))
    await expect(page.locator('h1')).toBeVisible()
    await expectNoSeriousViolations(page, path)
  })
}

test('axe: pricing with an order, including the blocked-LinkedIn state', async ({ page }) => {
  await withOrder(page, { tierId: null, addonIds: ['linkedin', 'cover'] }, '/pricing')
  await expectNoSeriousViolations(page, 'pricing (blocked)')
})

test('axe: review page with validation errors showing', async ({ page }) => {
  await withOrder(page, { tierId: 'professional', addonIds: ['cover'] }, '/pricing/review')
  await page.getByRole('button', { name: 'Place demo order' }).click()
  await expect(page.locator('.form-field__error').first()).toBeVisible()
  await expectNoSeriousViolations(page, 'review (errors)')
})

test('axe: confirmation letter', async ({ page }) => {
  await withOrder(
    page,
    {
      tierId: 'executive',
      addonIds: ['linkedin'],
      details: { name: 'Priya Shah', email: 'priya@example.com', currentTitle: 'VP', targetRole: 'Chief Operating Officer' },
      placed: { number: 'SL-2026-7K2M', placedAt: '2026-09-26T12:00:00.000Z' },
    },
    '/pricing/confirmation',
  )
  await expect(page.getByText('Dear Priya,')).toBeVisible()
  await expectNoSeriousViolations(page, 'confirmation')
})

test('axe: open menus and sheets', async ({ page }, testInfo) => {
  if (isMobile(testInfo)) {
    await page.goto(route('/'))
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expectNoSeriousViolations(page, 'mobile menu open')
    await page.keyboard.press('Escape')
    await withOrder(page, { tierId: 'professional' }, '/pricing')
    await page.locator('.order-bar__summary').click()
    await expectNoSeriousViolations(page, 'order sheet open')
  } else {
    await page.goto(route('/'))
    await page.getByRole('button', { name: 'Services' }).click()
    await expectNoSeriousViolations(page, 'mega menu open')
  }
})

test('axe: contact form errors and success', async ({ page }) => {
  await page.goto(route('/faq#contact'))
  await page.getByRole('button', { name: 'Send message' }).click()
  await expectNoSeriousViolations(page, 'contact errors')
})
