import { test, expect } from '@playwright/test'

test('player zoom in', async ({ page }) => {
  await page.goto(
    '/basics/getting-started/record-your-playwright-tests/debugging-tests',
  )

  const image = page.locator('[data-testid="image-with-zoom"]').first()
  await image.scrollIntoViewIfNeeded()
  await image.click()

  const playerZoomedIn = page.locator('[data-testid="zoomed-in-player"]')
  await playerZoomedIn.scrollIntoViewIfNeeded()
  await expect(playerZoomedIn).toHaveCount(1)

  await image.click()
  await expect(playerZoomedIn).toHaveCount(0)
})
