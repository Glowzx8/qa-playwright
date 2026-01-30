import { test as base, expect } from '@playwright/test';
import { AppointmentPage } from '../../pages/AppointmentPage';

/**
 * Fixtures Playwright — contexte “déjà authentifié”.
 * But : éviter de répéter le login dans chaque test et accélérer la lecture (tests centrés scénario).
 */

type Fixtures = {
    appointmentPage: AppointmentPage;
};

export const test = base.extend<Fixtures>({
    // Fixture : fournit un AppointmentPage prêt à l'emploi.
    appointmentPage: async ({ page }, use) => {
        await use(new AppointmentPage(page));
    },

    // Fixture “page” : on surcharge la page Playwright pour effectuer le login avant chaque test.
    page: async ({ page }, use) => {
        await page.goto('/');

        // 1) Home -> Make Appointment (navigation vers login)
        await page.locator('#btn-make-appointment').click({ noWaitAfter: true });
        await page.waitForURL(/profile\.php#login/);


        // 2) Saisie des identifiants + clic Login
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: /login/i }).click();

        // 3) Synchronisation : on attend que l'écran 'appointment' soit prêt (évite du flaky)
        await expect(page).toHaveURL(/#appointment/);
        await page.locator('#combo_facility').waitFor({ state: 'visible' });

        await use(page);
    },
});

// Re-export : permet d'importer { test, expect } depuis ce fixture dans les specs.
export { expect } from '@playwright/test';
