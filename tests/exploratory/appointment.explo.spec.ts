import { test, expect } from '../fixtures/pages';

test.describe('@exploratory Appointment', () => {

  test('exploratory submit variations', async ({ loginPage, appointmentPage, page }) => {

    await loginPage.goto();
    await loginPage.openLogin();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await appointmentPage.fillForm({
      facility: 'Tokyo CURA Healthcare Center',
      readmission: false,
      program: 'None',
      comment: 'Exploratory test'
    });

    await appointmentPage.pickDateAsUser('2026-08-30');

    await appointmentPage.submitForced();

    await expect(page.locator('body')).toBeVisible();
  });

});
