import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';

/**
 * Fixtures Playwright — Page Objects “bruts” (sans login).
 * Utilisé pour les tests d’authent (positif/négatif) ou les scénarios qui démarrent avant la connexion.
 */

type PagesFixtures = {
  loginPage: LoginPage;
  appointmentPage: AppointmentPage;
};

export const test = base.extend<PagesFixtures>({
  // Fournit un LoginPage (POM) lié à la page Playwright.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Fournit un AppointmentPage (POM) lié à la page Playwright.
  appointmentPage: async ({ page }, use) => {
    await use(new AppointmentPage(page));
  },
});

// Re-export utilitaire
export { expect };
export type { Page };
