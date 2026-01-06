import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';

test.describe('@e2e @user Appointment', () => {

  test('user can create an appointment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

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

    await expect(page.locator('h2')).toHaveText('Appointment Confirmation');
  });

 test('user cannot create appointment without date', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appointmentPage = new AppointmentPage(page);

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
});

});
