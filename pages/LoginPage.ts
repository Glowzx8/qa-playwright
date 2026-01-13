import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://katalon-demo-cura.herokuapp.com/');
  }

  async openLogin() {
    await this.page.getByRole('link', { name: 'Make Appointment' }).click();
  }

  async login(username: string, password: string) {
    await this.page.locator('#txt-username').fill(username);
    await this.page.locator('#txt-password').fill(password);
    await this.page.locator('#btn-login').click();


  }
}
