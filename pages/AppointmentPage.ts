import { Page } from '@playwright/test';

/**
 * Page Object Model (POM) — écran "Make Appointment".
 * Objectif : centraliser locators + actions métier pour garder les tests lisibles (scénario > technique).
 */

export type AppointmentData = {
  facility: string;
  readmission: boolean;
  program: 'Medicare' | 'Medicaid' | 'None';
  comment?: string;
};

export class AppointmentPage {
  constructor(private readonly page: Page) { }

  // Remplit le formulaire avec des données métier (facility, programme, commentaire...).
  async fillForm(data: AppointmentData) {
    await this.page
      .locator('#combo_facility')
      .selectOption({ label: data.facility });

    if (data.readmission) {
      await this.page.locator('#chk_hospotal_readmission').check();
    }

    // Programme de soins : 1 choix exclusif (radios)
    switch (data.program) {
      case 'Medicare':
        await this.page.locator('#radio_program_medicare').check();
        break;
      case 'Medicaid':
        await this.page.locator('#radio_program_medicaid').check();
        break;
      case 'None':
        await this.page.locator('#radio_program_none').check();
        break;
    }

    // Commentaire : optionnel
    if (data.comment) {
      await this.page.locator('#txt_comment').fill(data.comment);
    }
  }

  /**
    * Renseigne la date de visite comme un utilisateur.
    * Attendu : date déjà formatée en dd/mm/yyyy (ex: 10/01/2026).
    */
  async pickDateAsUser(date: string) {
    const dateInput = this.page.locator('#txt_visit_date');
    await dateInput.click();
    await dateInput.fill('');
    await dateInput.type(date, { delay: 20 });
    await dateInput.press('Tab');
  }

  /**
     * Soumission “normale” via le bouton (déclenche la validation côté UI).
     */
  async submit() {
    await this.page.locator('#btn-book-appointment').click();
  }

  /**
    * Soumet et attend la page de confirmation (évite les flakiness liées à la navigation, notamment avec firefox).
    */
  async submitAndWaitForConfirmation() {
    await Promise.all([
      this.page.waitForURL(/#summary/),
      this.page.locator('#btn-book-appointment').click(),
    ]);
  }
}
