import { test, expect } from '../fixtures/authenticated.fixture';
import { appointmentData, curaDatePlus } from '../helpers/appointmentData';

/**
 * REGRESSION — Cas aux limites autour de la date de visite (jeu de données).
 * Intérêt : valider la robustesse de l’input date et le rendu sur la page de validation.
 */

const dateCases = [
    { name: 'J-1', offset: -1 },
    { name: 'JJ', offset: 0 },
    { name: 'J+1', offset: 1 },
    { name: 'J+365', offset: 365 },
];

for (const c of dateCases) {
    test(`visit date ${c.name}`, async ({ appointmentPage, page }) => {
        await page.goto('/#appointment');

        await appointmentPage.fillForm(appointmentData.valid());
        await appointmentPage.pickDateAsUser(curaDatePlus(c.offset));
        await appointmentPage.submitAndWaitForConfirmation();
    });
}

test.describe('@regression @date Appointment date edge cases', () => {
    for (const c of dateCases) {
        test(`visit date ${c.name}`, async ({ appointmentPage, page }) => {
            const data = appointmentData.valid();

            const inputDate = curaDatePlus(c.offset);

            await page.goto('/#appointment');
            await appointmentPage.fillForm(data);
            await appointmentPage.pickDateAsUser(inputDate);
            await appointmentPage.submitAndWaitForConfirmation();

            await expect(page).toHaveURL(/#summary/);
            await expect(page.locator('#visit_date')).toContainText(inputDate);
        });
    }

    test('cannot submit appointment without visit date', async ({ appointmentPage, page }) => {
        const data = appointmentData.valid();

        await page.goto('/#appointment');
        await appointmentPage.fillForm(data);
        await appointmentPage.submit();

        await expect(page).not.toHaveURL(/#summary/);

        const missing = await page
            .locator('#txt_visit_date')
            .evaluate(el => (el as HTMLInputElement).validity.valueMissing);

        expect(missing).toBeTruthy();
    });
});
