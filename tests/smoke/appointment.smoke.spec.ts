import { test, expect } from '../fixtures/authenticated.fixture';

/**
 * SMOKE — Tests rapides “canary” autour du formulaire de RDV.
 * Objectif : détecter très tôt si l'écran principal est cassé (sélecteur, validation requise...).
 */

test.describe('@smoke Appointment form exploration', () => {

  test('facility selector accepts all available values', async ({ page }) => {
    await page.goto('/#appointment');

    // Valeurs présentes dans le select “Facility”
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
