import { test, expect } from '../fixtures/pages.fixture';

test.describe('@exploratory Appointment form exploration', () => {

  test('facility selector accepts all available values', async ({ page }) => {
    await page.goto('/#appointment');

    const facilities = [
      'Tokyo CURA Healthcare Center',
      'Hongkong CURA Healthcare Center',
      'Seoul CURA Healthcare Center',
    ];

    for (const facility of facilities) {
      await page.selectOption('#combo_facility', { label: facility });
      await expect(page.locator('#combo_facility')).toHaveValue(facility);
    }
  });

  test('appointment cannot be submitted without required fields', async ({ page }) => {
    await page.goto('/#appointment');

    await page.click('#btn-book-appointment');

    await expect(page.locator('h2')).toHaveText('Make Appointment');
  });

});
