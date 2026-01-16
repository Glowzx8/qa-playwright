import { test, expect } from '../fixtures/pages.fixture';
import { appointmentData } from '../helpers/appointmentData';

test.describe('@e2e @user Appointment', () => {

  test('user can create an appointment', async ({ appointmentPage, page }) => {
    await page.goto('/#appointment');

    await appointmentPage.fillForm(appointmentData.valid());
    await appointmentPage.pickDateAsUser('2026-01-10');
    await appointmentPage.submitWithValidation();

    await expect(page.locator('h2')).toHaveText('Appointment Confirmation');
  });


  test('user cannot submit without mandatory fields', async ({ page }) => {
    await page.goto('/#appointment');

    await page.click('#btn-book-appointment');
    await expect(page).toHaveURL(/#appointment/);
  });

});
