import { test, expect } from '../fixtures/pages.fixture';
import { appointmentData } from '../helpers/appointmentData';

test.describe('@regression Appointment confirmation consistency', () => {

  test(
    'confirmation page displays submitted appointment data',
    async ({ appointmentPage, page }) => {
      const data = appointmentData.valid();

      await page.goto('/#appointment');

      await appointmentPage.fillForm(data);
      await appointmentPage.pickDateAsUser('2026-01-10');
      await appointmentPage.submitWithValidation();

      await expect(page.locator('h2'))
        .toHaveText('Appointment Confirmation');

      await expect(page.locator('#facility'))
        .toContainText(data.facility);

      await expect(page.locator('#program'))
        .toContainText(data.program);

      if (data.comment) {
        await expect(page.locator('#comment'))
          .toContainText(data.comment);
      }
    }
  );

});
