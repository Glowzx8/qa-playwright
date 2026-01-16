import { Page } from '@playwright/test';

export type AppointmentData = {
  facility: string;
  readmission: boolean;
  program: 'Medicare' | 'Medicaid' | 'None';
  comment?: string;
};

export class AppointmentPage {
  constructor(private readonly page: Page) { }

  async fillForm(data: AppointmentData) {
    await this.page
      .locator('#combo_facility')
      .selectOption({ label: data.facility });

    if (data.readmission) {
      await this.page.locator('#chk_hospotal_readmission').check();
    }

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

    if (data.comment) {
      await this.page.locator('#txt_comment').fill(data.comment);
    }
  }

  /**
   * CURA-specific: date must be typed like a real user
   */
  async pickDateAsUser(date: string) {
    const dateInput = this.page.locator('#txt_visit_date');

    await dateInput.click();
    await dateInput.pressSequentially(date);
    await dateInput.press('Tab');
  }

  /**
   * Standard user submission
   */
  async submitWithValidation() {
    await Promise.all([
      this.page.waitForURL(/#summary/),
      this.page.locator('#btn-book-appointment').click(),
    ]);
  }

  /**
   * Technical / edge-case submission (bypass client validation)
   */
  async submitForced() {
    await this.page.locator('form').evaluate(form => {
      (form as HTMLFormElement).submit();
    });
  }
}
