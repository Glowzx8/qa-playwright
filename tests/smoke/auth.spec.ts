import { test, expect } from '../fixtures/pages.fixture';

/**
 * SMOKE AUTH — Un login simple pour valider que l'accès au parcours RDV fonctionne. (Sur CURA Healthcare, il n'y a qu'un seul login possible.)
 * Objectif : test rapide à lancer en premier (local/CI) pour vérifier que l’app répond.
 */

test.describe('@smoke @auth Authentication basic test', () => {

// Login “cas nominal”
  test('login should work and user can access appointment page', async ({ loginPage, appointmentPage, page }) => {
    await loginPage.goto();
    await loginPage.openLogin();
    await expect(page).toHaveURL(/#login/);
    await loginPage.login('John Doe', 'ThisIsNotAPassword');
    await expect(page).toHaveURL(/#appointment/);
});
});
