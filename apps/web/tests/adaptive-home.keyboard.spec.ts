import { test, expect } from '@playwright/test';

const DASHBOARD_STORAGE_KEY = 'blackwellen:dashboard:v1';

async function clearDashboardState(page: import('@playwright/test').Page) {
  await page.addInitScript((key) => {
    try {
      window.localStorage.removeItem(key as string);
    } catch (error) {
      console.warn('Unable to reset dashboard storage', error);
    }
  }, DASHBOARD_STORAGE_KEY);
}

test.describe('Adaptive home keyboard reordering', () => {
  test.beforeEach(async ({ page }) => {
    await clearDashboardState(page);
  });

  test('allows widgets to be reordered with the keyboard and persists the layout', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: 'Adaptive home' })).toBeVisible();

    const initialOrder = await page
      .getByRole('heading', { level: 3 })
      .allTextContents();
    expect(initialOrder.slice(0, 2)).toEqual(['Celebrations', 'Compliance tracker']);

    const firstReorderHandle = page.getByRole('button', { name: 'Reorder widget' }).first();

    await firstReorderHandle.focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');

    const reorderedHeadings = await page
      .getByRole('heading', { level: 3 })
      .allTextContents();
    expect(reorderedHeadings.slice(0, 2)).toEqual(['Compliance tracker', 'Celebrations']);

    await page.waitForFunction((key) => {
      const raw = window.localStorage.getItem(key as string);
      if (!raw) {
        return false;
      }
      try {
        const parsed = JSON.parse(raw) as { layout?: string[] };
        return Array.isArray(parsed.layout) && parsed.layout[0] === 'compliance';
      } catch (error) {
        console.error('Failed to parse dashboard storage', error);
        return false;
      }
    }, DASHBOARD_STORAGE_KEY);

    const storedLayout = await page.evaluate((key) => {
      const raw = window.localStorage.getItem(key as string);
      return raw ? JSON.parse(raw) : null;
    }, DASHBOARD_STORAGE_KEY);

    expect(storedLayout?.layout?.slice(0, 2)).toEqual(['compliance', 'celebrations']);

    await page.reload();
    await expect(page.getByRole('heading', { level: 3 }).first()).toHaveText('Compliance tracker');
  });
});
