import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';

test.describe('@regression @tech Appointment', () => {

  test('create appointment with readmission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.goto();
    await loginPage.openLogin();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await appointmentPage.fillForm({
      facility: 'Seoul CURA Healthcare Center',
      readmission: true,
      program: 'Medicaid',
      date: '2026-12-30',
      comment: 'Regression test'
    });

    await appointmentPage.submitForced();

    await expect(page.locator('h2')).toHaveText('Appointment Confirmation');
  });

});
