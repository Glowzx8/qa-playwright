import { test, expect } from '../fixtures/pages';

test.describe('@e2e @user Appointment', () => {

  test(
    'user can create an appointment',
    async ({ loginPage, appointmentPage }) => {
      await loginPage.goto();
      await loginPage.openLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');

      await appointmentPage.fillForm({
        facility: 'Tokyo CURA Healthcare Center',
        readmission: true,
        program: 'Medicare',
        comment: 'E2E user test'
      });



      await appointmentPage.pickDateAsUser('2026-01-10');
      await appointmentPage.submitWithValidation();
    }
  );

  test(
    'user cannot create appointment without date',
    async ({ loginPage, appointmentPage, page }) => {
      await loginPage.goto();
      await loginPage.openLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');


      await appointmentPage.fillForm({
        facility: 'Tokyo CURA Healthcare Center',
        readmission: true,
        program: 'Medicare',
        comment: 'Missing date'
      });

      const dateInput = page.locator('#txt_visit_date');
      await dateInput.click();
      await dateInput.press('Tab');

      await appointmentPage.submitWithValidation();


      await expect(page.locator('h2')).toHaveText('Make Appointment');
      await expect(page.locator('#summary')).toHaveCount(0);
    }
  );

});
