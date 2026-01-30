import { test, expect } from '../fixtures/authenticated.fixture';
import { appointmentData } from '../helpers/appointmentData';

/**
 * REGRESSION — Vérifie que la page de confirmation reflète bien les données saisies.
 * Objectif : contrôler que chaque champ du formulaire reçoit la bonne donnée (facility, program, commentaire), sinon le test échoue → alerte régression.
 */

test.describe('@regression Appointment confirmation consistency', () => {

  test('confirmation page displays submitted appointment data',
    
    async ({ appointmentPage, page }) => {
      const data = appointmentData.valid();   
      const visitDate = '10/06/2026'; // Date fixe pour que le test donne toujours le même résultat (peu importe quand il tourne).

      await appointmentPage.fillForm(data);
            await appointmentPage.pickDateAsUser(visitDate);
      await appointmentPage.submitAndWaitForConfirmation();

      await expect(page).toHaveURL(/#summary/);

      await expect(page.locator('h2')).toHaveText('Appointment Confirmation');

      await expect(page.locator('#facility')).toContainText(data.facility);

      await expect(page.locator('#program')).toContainText(data.program);
      
      if (data.comment) {
        await expect(page.locator('#comment')).toContainText(data.comment);
      }
    }
  );
    test('user cannot submit without mandatory fields', async ({ page }) => {
      await page.goto('/#appointment');

      await page.click('#btn-book-appointment');
      await expect(page).toHaveURL(/#appointment/);
    });

});
