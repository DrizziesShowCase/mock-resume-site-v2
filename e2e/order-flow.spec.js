import { expect, test } from '@playwright/test'
import { isMobile, orderSheet, route, withOrder } from './helpers.js'

const total = (scope) => scope.locator('.order-lines__total-amount')

test.beforeEach(async ({ page }) => {
  await page.goto(route('/'))
  await page.evaluate(() => sessionStorage.clear())
})

test('deep link preselects tier and add-on, then cleans the URL', async ({ page }, testInfo) => {
  await page.goto(route('/pricing?tier=executive&addon=linkedin'))
  await expect(page.getByRole('radio', { name: /Executive/ })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: /LinkedIn Profile/ })).toBeChecked()
  await expect(page).toHaveURL(/#\/pricing$/)
  await expect(total(await orderSheet(page, testInfo))).toHaveText('$878')
})

test('choosing options updates the total and survives a refresh', async ({ page }, testInfo) => {
  await page.goto(route('/pricing'))
  await page.getByRole('radio', { name: /Early Career/ }).check()
  await page.getByRole('checkbox', { name: /Cover Letter/ }).check()
  await page.getByRole('checkbox', { name: /Thank-You Letter/ }).check()
  await page.getByRole('checkbox', { name: /Thank-You Letter/ }).uncheck()
  await expect(total(await orderSheet(page, testInfo))).toHaveText('$628')

  await page.reload()
  await expect(page.getByRole('radio', { name: /Early Career/ })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: /Cover Letter/ })).toBeChecked()
})

test('tier cards are a native radio group (arrow keys move the choice)', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), 'keyboard behavior is the same at every width')
  await page.goto(route('/pricing'))
  await page.getByRole('radio', { name: /Early Career/ }).check()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: /Professional/ })).toBeChecked()
  await expect(page.getByRole('radio', { name: /Professional/ })).toBeFocused()
})

test('LinkedIn without a tier is flagged, never silently removed, and review is blocked', async ({ page }, testInfo) => {
  await page.goto(route('/pricing'))
  await page.getByRole('checkbox', { name: /LinkedIn Profile/ }).check()
  await expect(page.getByRole('status').filter({ hasText: 'is written from your new résumé' })).toBeVisible()
  await expect(page.getByRole('checkbox', { name: /LinkedIn Profile/ })).toBeChecked()

  const sheet = await orderSheet(page, testInfo)
  await expect(sheet.getByText('Needs a résumé tier')).toBeVisible()
  await expect(sheet.getByRole('button', { name: 'Review order' })).toBeDisabled()
  await expect(sheet.getByText('Choose a résumé tier to continue.')).toBeVisible()
})

test('clear empties the order', async ({ page }, testInfo) => {
  await withOrder(page, { tierId: 'professional', addonIds: ['cover'] }, '/pricing')
  const sheet = await orderSheet(page, testInfo)
  await sheet.getByRole('button', { name: 'Clear' }).click()
  await expect(total(sheet)).toHaveText('$0')
  await expect(sheet.getByText('No tier chosen yet')).toBeVisible()
})

test('review and confirmation are guarded', async ({ page }) => {
  await page.goto(route('/pricing/review'))
  await expect(page).toHaveURL(/#\/pricing$/)
  await page.goto(route('/pricing/confirmation'))
  await expect(page).toHaveURL(/#\/pricing$/)
})

test('full order: review validation, place order, confirmation letter, start over', async ({ page }, testInfo) => {
  await page.goto(route('/pricing'))
  await page.getByRole('radio', { name: /Professional/ }).check()
  await page.getByRole('checkbox', { name: /Interview Prep/ }).check()
  const sheet = await orderSheet(page, testInfo)
  await sheet.getByRole('link', { name: 'Review order' }).click()
  await expect(page).toHaveURL(/#\/pricing\/review$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Review your order' })).toBeVisible()

  // Empty submit: every required field reports, focus goes to the first.
  await page.getByRole('button', { name: 'Place demo order' }).click()
  await expect(page.getByText('Enter your name.')).toBeVisible()
  await expect(page.getByText('Enter your email address.')).toBeVisible()
  await expect(page.getByText('Tell us the role you’re aiming for.')).toBeVisible()
  await expect(page.getByLabel('Full name')).toBeFocused()
  await expect(page.getByLabel('Full name')).toHaveAttribute('aria-invalid', 'true')

  await page.getByLabel('Full name').fill('Maya Okafor')
  await page.getByLabel('Email').fill('maya@example')
  await page.getByLabel('Role you’re aiming for').fill('Operations Manager')
  await page.getByRole('button', { name: 'Place demo order' }).click()
  await expect(page.getByText('Enter an email address like name@example.com.')).toBeVisible()
  await page.getByLabel('Email').fill('maya@example.com')
  await page.getByRole('button', { name: 'Place demo order' }).click()

  await expect(page).toHaveURL(/#\/pricing\/confirmation$/)
  await expect(page).toHaveTitle('Order confirmed | Shortlist')
  await expect(page.getByText('Dear Maya,')).toBeVisible()
  await expect(page.getByText('Operations Manager', { exact: true })).toBeVisible()
  const number = await page.locator('.letter__number-value').textContent()
  expect(number).toMatch(/^SL-\d{4}-[0-9A-HJKMNP-TV-Z]{4}$/)
  await expect(page.locator('.letter').getByText('$738')).toBeVisible()
  await expect(page.locator('.timeline__step')).toHaveCount(5)

  // A refresh keeps the confirmation; going back to review bounces here.
  await page.reload()
  await expect(page.locator('.letter__number-value')).toHaveText(number)
  await page.goto(route('/pricing/review'))
  await expect(page).toHaveURL(/#\/pricing\/confirmation$/)

  await page.getByRole('button', { name: 'Start a new order' }).click()
  await expect(page).toHaveURL(/#\/pricing$/)
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0)
})

test('mobile order bar opens the sheet and Esc closes it', async ({ page }, testInfo) => {
  test.skip(!isMobile(testInfo), 'the order bar only exists below 1024px')
  await withOrder(page, { tierId: 'professional', addonIds: ['cover'] }, '/pricing')
  await expect(page.locator('.pricing__sheet')).toBeHidden()
  await expect(page.locator('.order-bar__total')).toHaveText('$748')
  await page.locator('.order-bar__summary').click()
  await expect(page.locator('dialog.order-bar__sheet')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog.order-bar__sheet')).toBeHidden()
})
