/**
 * Captures a still of every lab experiment into src/assets/thumbnails.
 *
 *   pnpm dev            # in one terminal
 *   pnpm thumbnails     # in another; BASE_URL defaults to http://localhost:3000
 *   pnpm thumbnails vortex waves   # only some experiments
 *
 * Uses the locally installed Google Chrome through playwright-core, so no browser download.
 */
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT_DIR = new URL('../src/assets/thumbnails/', import.meta.url)

// Every experiment slug, with how long to let it run before capturing.
// Slow-growing sketches need longer before they look like themselves.
const settleMs: Record<string, number> = {
  'little-creature': 3000,
  'noise-direction': 3000,
  'reaction-diffusion': 8000,
  'reaction-diffusion-draw': 10000,
  'noise-pace': 15000,
  'noise-flow': 8000,
  'noise-flow-2': 8000,
  'hex-runner': 8000,
  vortex: 8000,
  waves: 6000,
  galaxy: 6000,
}

const requested = process.argv.slice(2)
const targets = requested.length > 0 ? requested : Object.keys(settleMs)

await mkdir(OUT_DIR, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

for (const slug of targets) {
  await page.goto(`${BASE_URL}/lab/${slug}`, { waitUntil: 'networkidle' })
  const stage = page.locator('figure').first()
  await stage.locator('.sketch-stage > *').first().waitFor()

  if (slug === 'reaction-diffusion-draw') {
    // This one only grows where the pointer is dragged, so sweep across the lettering.
    const box = await stage.boundingBox()
    if (box) {
      const y = box.y + box.height / 2
      await page.mouse.move(box.x + box.width * 0.2, y)
      await page.mouse.down()
      // A loose spiral reads better as a thumbnail than a straight stroke.
      for (let i = 0; i <= 240; i++) {
        const angle = i * 0.09
        const radius = box.width * (0.05 + i * 0.0013)
        await page.mouse.move(
          box.x + box.width / 2 + Math.cos(angle) * radius,
          y + Math.sin(angle) * radius,
        )
      }
    }
  }
  if (slug === 'little-creature') {
    const box = await stage.boundingBox()
    if (box)
      await page.mouse.move(box.x + box.width * 0.62, box.y + box.height * 0.4, { steps: 20 })
  }

  await page.waitForTimeout(settleMs[slug] ?? 4000)
  await page.mouse.up()
  await stage.screenshot({
    path: new URL(`${slug}.jpg`, OUT_DIR).pathname,
    type: 'jpeg',
    quality: 82,
  })
  console.log(`captured ${slug}`)
}

await browser.close()
