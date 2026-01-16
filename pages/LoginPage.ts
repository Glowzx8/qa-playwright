import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) { }

  async goto() {
    await this.page.goto('/');
  }

  async openLogin() {
    await this.page.getByRole('link', { name: 'Make Appointment' }).click();
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
