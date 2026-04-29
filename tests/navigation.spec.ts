import { test, expect } from '@playwright/test'

test('navigation expanding works', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Time Travel DevTools').click()
  const navigationItem = page.getByText('Live Console logs', { exact: true })
  await expect(navigationItem).toBeVisible()
})

test('navigation collapsing works', async ({ page }) => {
  await page.goto('/basics/test-suites/pr-comments')
  const nav = page.locator('nav')
  const navigationItem = nav.getByText('PR Comments', { exact: true })
  await expect(navigationItem).toBeVisible()

  await nav.getByText('Record your Playwright test').click()
  await expect(navigationItem).not.toBeVisible()
})
