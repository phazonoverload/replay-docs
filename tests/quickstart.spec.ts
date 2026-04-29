import { test, expect } from '@playwright/test'

test('home page links to record-your-app quickstart', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('link', { name: 'Quickstart: record your app in the Replay browser' })
    .click()
  await expect(page).toHaveURL(/.*\/getting-started/)
  const heading = page.getByRole('heading', { name: 'How to record' })
  await expect(heading).toBeVisible()
})
