import { test, expect } from '../fixtures/pages.fixture';
import type { Page } from '@playwright/test';

/**
 * REGRESSION AUTH — Cas négatifs (mauvais identifiants, casse, champs vides).
 * Intérêt : s'assurer que l’UI refuse correctement et affiche un message d’erreur stable.
 */

test.describe('@regression @auth Auth negative cases', () => {
    // Message d'erreur attendu (stabilité UI)
    const errorText = 'Login failed! Please ensure the username and password are valid.';

    // Assertion réutilisable : on reste sur la page login et on vérifie le message
    const expectLoginFailed = async (page: Page) => {
        await expect(page).not.toHaveURL(/#appointment/);
        await expect(
            page.locator('.text-danger', { hasText: 'Login failed!' })
        ).toHaveText(errorText);
    };

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('login fails with case mismatch password', async ({ loginPage, page }) => {
        await loginPage.login('John Doe', 'thisIsNotAPassword');
        await expectLoginFailed(page);
    });

    test('login fails with invalid username', async ({ loginPage, page }) => {
        await loginPage.login('Terminator Deux', 'ThisIsNotAPassword');
        await expectLoginFailed(page);
    });

    test('login fails with empty credentials', async ({ loginPage, page }) => {
        await loginPage.login('', '');
        await expectLoginFailed(page);
    });
});
