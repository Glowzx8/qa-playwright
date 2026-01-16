import { Page } from '@playwright/test';
import { test as base } from './auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';


type PagesFixtures = {
  loginPage: LoginPage;
  appointmentPage: AppointmentPage;
};

export const test = base.extend<PagesFixtures>({
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },

  appointmentPage: async ({ page }: { page: Page }, use) => {
    await use(new AppointmentPage(page));
  },
});

export { expect } from '@playwright/test';
