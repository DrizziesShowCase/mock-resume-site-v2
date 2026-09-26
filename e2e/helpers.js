import { expect } from '@playwright/test'

// All routes live behind the hash (HashRouter), e.g. route('/pricing') → '/#/pricing'.
export const route = (path) => `/#${path}`

export const isMobile = (testInfo) => testInfo.project.name === 'mobile'

// Seed the order the same way the app stores it, then load `path` fresh. With
// HashRouter a route change alone doesn't reload the page, so we leave the app
// entirely first; otherwise it keeps its empty order (and the review and
// confirmation guards redirect before storage is ever re-read).
export async function withOrder(page, order, path) {
  await page.goto(route('/'))
  await page.evaluate((o) => {
    sessionStorage.setItem(
      'shortlist-order-v1',
      JSON.stringify({ tierId: null, addonIds: [], details: { name: '', email: '', currentTitle: '', targetRole: '' }, placed: null, ...o }),
    )
  }, order)
  await page.goto('about:blank')
  await page.goto(route(path))
}

// The visible Order Sheet: the sidebar on desktop, the bottom sheet on mobile.
export async function orderSheet(page, testInfo) {
  if (isMobile(testInfo)) {
    await page.locator('.order-bar__summary').click()
    const sheet = page.locator('dialog.order-bar__sheet')
    await expect(sheet).toBeVisible()
    return sheet
  }
  return page.locator('.pricing__sheet')
}

export async function noHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow, 'page scrolls sideways').toBe(false)
}
