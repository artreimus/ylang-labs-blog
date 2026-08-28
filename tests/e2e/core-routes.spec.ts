import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const coreRoutes = [
  '/',
  '/blogs',
  '/projects',
  '/contact-us',
  '/legal',
  '/blogs/openclaw-on-aws',
  '/blogs/xllm-cluster-architecture-ai-inference',
  '/projects/davincis-notebook',
]

test.beforeEach(async ({ page }, testInfo) => {
  const theme = testInfo.project.name === 'mobile-chromium' ? 'dark' : 'light'
  await page.addInitScript((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme)
})

for (const route of coreRoutes) {
  test(`${route} has no serious accessibility, console, or overflow regression`, async ({
    page,
  }) => {
    const consoleErrors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })

    await page.emulateMedia({
      colorScheme: test.info().project.name === 'mobile-chromium' ? 'dark' : 'light',
      reducedMotion: 'reduce',
    })
    await page.goto(route, { waitUntil: 'load' })

    await expect(page.locator('#main-content')).toBeVisible()
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
      )
      .toBeLessThanOrEqual(1)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    const blockingViolations = results.violations
      .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        targets: violation.nodes.flatMap((node) => node.target),
      }))

    expect(blockingViolations).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

test('listing search is URL-backed and returns to the canonical route', async ({ page }) => {
  await page.goto('/blogs')
  const search = page.getByRole('searchbox', { name: 'Search articles' })

  await search.fill('OpenClaw')
  await expect(page).toHaveURL(/\/blogs\?q=OpenClaw$/)
  await expect(
    page.getByRole('link', { name: 'OpenClaw on AWS', exact: true }).first()
  ).toBeVisible()

  await search.fill('')
  await expect(page).toHaveURL(/\/blogs$/)
})

test('contact validation stays on the Ylang origin and focuses an invalid field', async ({
  page,
}) => {
  await page.goto('/contact-us')
  const initialOrigin = await page.evaluate(() => window.location.origin)

  await page.getByRole('button', { name: 'Send Message' }).click()

  await expect(page.getByLabel('First Name')).toBeFocused()
  await expect(page.getByText('First name is required')).toBeVisible()
  expect(await page.evaluate(() => window.location.origin)).toBe(initialOrigin)
})

test('skip link reaches the main landmark with the keyboard', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })

  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})
