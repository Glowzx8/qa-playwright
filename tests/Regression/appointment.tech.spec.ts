import { test, expect } from '../fixtures/pages';

test.describe('@regression @tech Appointment', () => {

  test('create appointment with readmission', async ({ loginPage, appointmentPage, page }) => {

    await loginPage.goto();
    await loginPage.openLogin();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await appointmentPage.fillForm({
      facility: 'Seoul CURA Healthcare Center',
      readmission: true,
      program: 'Medicaid',
      comment: 'Regression test'
    });

    await appointmentPage.pickDateAsUser('2026-11-10');

    await appointmentPage.submitForced();

    await expect(page.locator('h2')).toHaveText('Appointment Confirmation');
  });

});
