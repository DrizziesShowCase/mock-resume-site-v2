import { expect, test } from '@playwright/test'
import { isMobile, noHorizontalOverflow, route } from './helpers.js'

const pages = [
  { path: '/', title: 'Shortlist Résumé Co. — Professional résumé writing', h1: 'Get on the shortlist.' },
  { path: '/pricing', title: 'Build your order | Shortlist', h1: 'Build your order' },
  { path: '/why-us', title: 'Why Shortlist | Shortlist', h1: 'Written by a person, never a template.' },
  { path: '/process', title: 'Our process | Shortlist', h1: 'From first call to final files' },
  { path: '/faq', title: 'FAQ & contact | Shortlist', h1: 'Questions, answered' },
  { path: '/no-such-page', title: 'Page not found | Shortlist', h1: 'This page didn’t make the shortlist.' },
]

for (const p of pages) {
  test(`${p.path} renders with its title, one h1, the disclaimer, and no sideways scroll`, async ({ page }) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    await page.goto(route(p.path))
    await expect(page).toHaveTitle(p.title)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(p.h1)
    await expect(page.getByText('Portfolio demo. Shortlist Résumé Co. is a fictional company.')).toBeVisible()
    await noHorizontalOverflow(page)
    expect(errors).toEqual([])
  })
}

test('navigating moves focus to the new page content', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), 'desktop nav')
  await page.goto(route('/'))
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Why Shortlist' }).click()
  await expect(page.locator('#main')).toBeFocused()
})

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto(route('/'))
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await skip.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
  await expect(page).toHaveURL(/#\/$/)
})

test('Services mega menu: click opens, Esc closes and returns focus', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), 'desktop header only')
  await page.goto(route('/'))
  const trigger = page.getByRole('button', { name: 'Services' })
  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('link', { name: /^Executive résumé/ })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toBeFocused()
})

test('Services mega menu links preselect the configurator', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), 'desktop header only')
  await page.goto(route('/'))
  await page.getByRole('button', { name: 'Services' }).click()
  await page.getByRole('link', { name: /^Executive résumé/ }).click()
  await expect(page.getByRole('radio', { name: /Executive/ })).toBeChecked()
})

test('mobile menu opens as a dialog and closes on Esc', async ({ page }, testInfo) => {
  test.skip(!isMobile(testInfo), 'mobile header only')
  await page.goto(route('/'))
  await page.getByRole('button', { name: 'Open menu' }).click()
  const menu = page.getByRole('dialog', { name: 'Menu' })
  await expect(menu).toBeVisible()
  await menu.getByRole('button', { name: 'Services' }).click()
  await expect(menu.getByRole('link', { name: 'Cover Letter' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
})

test('Home tier and add-on cards deep-link into the configurator', async ({ page }) => {
  await page.goto(route('/'))
  await page.getByRole('link', { name: 'Choose the Executive résumé' }).click()
  await expect(page.getByRole('radio', { name: /Executive/ })).toBeChecked()
  await page.goto(route('/'))
  await page.getByRole('link', { name: /LinkedIn Profile/ }).click()
  await expect(page.getByRole('checkbox', { name: /LinkedIn Profile/ })).toBeChecked()
})

test('footer anchor links land on the right section', async ({ page }) => {
  await page.goto(route('/'))
  await page.getByRole('contentinfo').getByRole('link', { name: 'Our guarantee' }).click()
  await expect(page).toHaveURL(/#\/why-us#guarantee$/)
  await expect(page.getByRole('heading', { name: 'The Shortlist Guarantee' })).toBeInViewport()
  await page.getByRole('contentinfo').getByRole('link', { name: 'Contact us' }).click()
  await expect(page.getByRole('heading', { name: 'Talk to a writer.' })).toBeInViewport()
})

test('process tabs: deep link, arrow keys, Home/End, URL sync', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), 'keyboard behavior is the same at every width')
  await page.goto(route('/process?tab=linkedin'))
  const tab = (name) => page.getByRole('tab', { name: new RegExp(`^${name}`) })
  await expect(tab('LinkedIn')).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('How your LinkedIn profile gets rewritten')

  await tab('LinkedIn').focus()
  await page.keyboard.press('ArrowRight')
  await expect(tab('Interview Prep')).toBeFocused()
  await expect(tab('Interview Prep')).toHaveAttribute('aria-selected', 'true')
  await expect(page).toHaveURL(/tab=interview-prep/)
  // End then ArrowRight with no wait between them: the second key must move
  // from the newly focused tab even before the URL has caught up.
  await page.keyboard.press('End')
  await page.keyboard.press('ArrowRight')
  await expect(tab('Résumés')).toBeFocused()
  await expect(page).toHaveURL(/#\/process$/)
  await page.keyboard.press('Home')
  await expect(tab('Résumés')).toHaveAttribute('tabindex', '0')

  await page.goto(route('/process?tab=nonsense'))
  await expect(tab('Résumés')).toHaveAttribute('aria-selected', 'true')
})

test('FAQ questions open and close with the keyboard', async ({ page }) => {
  await page.goto(route('/faq'))
  const first = page.locator('.faq__item').first()
  await first.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(first).toHaveAttribute('open', '')
  await page.keyboard.press('Space')
  await expect(first).not.toHaveAttribute('open', '')
})

test('contact form validates, confirms, and resets', async ({ page }) => {
  await page.goto(route('/faq#contact'))
  const form = page.locator('#contact')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form.locator('.form-field__error')).toHaveCount(4)
  await expect(form.getByLabel('Name')).toBeFocused()

  await form.getByLabel('Name').fill('Daniel Reyes')
  await form.getByLabel('Email').fill('daniel@example.com')
  await form.getByLabel('What’s it about?').selectOption('choosing')
  await form.getByLabel('Message', { exact: true }).fill('Which tier fits a new grad?')
  await form.getByRole('button', { name: 'Send message' }).click()

  const done = form.getByRole('heading', { name: 'Thanks, Daniel. Message received.' })
  await expect(done).toBeFocused()
  await form.getByRole('button', { name: 'Send another message' }).click()
  await expect(form.getByLabel('Name')).toHaveValue('')
})

test('comparison table restacks as cards on mobile', async ({ page }, testInfo) => {
  test.skip(!isMobile(testInfo), 'mobile layout only')
  await page.goto(route('/why-us'))
  const display = await page.locator('.compare tbody tr').first().evaluate((el) => getComputedStyle(el).display)
  expect(display).toBe('block')
  await expect(page.getByRole('table')).toBeAttached()
})

test('the page has a title before any route has rendered', async ({ page }) => {
  // Block the lazily loaded page chunk so the route can never render.
  await page.route(/\/assets\/Faq-.*\.js$/, () => {})
  await page.goto(route('/faq'))
  await expect(page).toHaveTitle('Shortlist Résumé Co. — Professional résumé writing')
  expect(await page.locator('title').count()).toBe(1)
})

test('every page keeps exactly one <title>', async ({ page }) => {
  for (const path of ['/', '/why-us', '/pricing', '/faq']) {
    await page.goto(route(path))
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.locator('title').count(), path).toBe(1)
  }
})
