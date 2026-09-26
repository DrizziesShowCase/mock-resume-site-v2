// Regenerates the README screenshots and the social-share image from the
// production build. Run `npm run build` first; `npm run screenshots` does both.
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import { preview } from 'vite'

const OUT = 'docs/screenshots'
const PORT = 4393
const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: 'silent' })
const base = `http://localhost:${PORT}/#`
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
// Reduced motion so every red-pen stroke is captured finished, not mid-draw.
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })

const order = {
  tierId: 'professional',
  addonIds: ['cover', 'linkedin'],
  details: { name: 'Maya Okafor', email: 'maya@example.com', currentTitle: 'Operations Manager', targetRole: 'Head of Operations' },
  placed: null,
}

async function open(context, path, seed) {
  const page = await context.newPage()
  if (seed) {
    await page.goto(`${base}/`)
    await page.evaluate((o) => sessionStorage.setItem('shortlist-order-v1', JSON.stringify(o)), seed)
    await page.goto('about:blank')
  }
  await page.goto(`${base}${path}`)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  return page
}

const shots = [
  ['home-desktop', desktop, '/'],
  ['pricing-desktop', desktop, '/pricing', order],
  ['confirmation-desktop', desktop, '/pricing/confirmation', { ...order, placed: { number: 'SL-2026-M8BP', placedAt: '2026-09-26T12:00:00Z' } }],
  ['process-desktop', desktop, '/process?tab=linkedin'],
  ['home-mobile', mobile, '/'],
]
for (const [name, context, path, seed] of shots) {
  const page = await open(context, path, seed)
  await page.screenshot({ path: `${OUT}/${name}.png` })
  await page.close()
}

// Mobile order sheet, opened.
const sheet = await open(mobile, '/pricing', order)
await sheet.locator('.order-bar__summary').click()
await sheet.waitForTimeout(400)
await sheet.screenshot({ path: `${OUT}/order-sheet-mobile.png` })

// Social-share image: the hero at 1200×630.
const og = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
const hero = await open(og, '/')
await hero.screenshot({ path: 'public/og-image.png' })

await browser.close()
await server.close()
console.log(`Saved screenshots to ${OUT}/ and public/og-image.png`)
