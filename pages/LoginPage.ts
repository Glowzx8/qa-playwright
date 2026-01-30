import { Page } from '@playwright/test';

/**
 * Page Object Model (POM) — parcours d’authentification.
 * On isole ici la navigation et l’action de login pour réutiliser facilement dans les tests.
 */

export class LoginPage {
  constructor(private page: Page) { }

  // Ouvre la page d’accueil de l’application.
  async goto() {
    await this.page.goto('/');
  }

  // Ouvre l’écran de login via le bouton “Make Appointment”.
  async openLogin() {
    await this.page.getByRole('link', { name: 'Make Appointment' }).click();
    await this.page.getByLabel('Username').waitFor({ state: 'visible' });
  }

  /**
   * Se connecte avec les identifiants fournis.
   * Si la page login n'est pas ouverte, on l'ouvre.
   */
  async login(username: string, password: string) {
    if (!(await this.page.getByLabel('Username').isVisible().catch(() => false))) {
      await this.openLogin();
    }
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
