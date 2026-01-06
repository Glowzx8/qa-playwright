import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';

test.describe('@exploratory Appointment', () => {

  test('exploratory submit variations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.goto();
    await loginPage.openLogin();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await appointmentPage.fillForm({
      facility: 'Tokyo CURA Healthcare Center',
      readmission: false,
      program: 'None',
      date: '2026-12-30',
      comment: 'Exploratory test'
    });

    await appointmentPage.submitForced();

    await expect(page.locator('body')).toBeVisible();
  });

});
