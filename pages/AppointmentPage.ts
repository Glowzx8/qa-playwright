import { Page } from '@playwright/test';

export class AppointmentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm(options: {
    facility: string;
    readmission: boolean;
    program: 'Medicare' | 'Medicaid' | 'None';
    comment?: string;
  }) {
    await this.page.locator('#combo_facility').selectOption({ label: options.facility });

    if (options.readmission) {
      await this.page.locator('#chk_hospotal_readmission').check();
    }

    if (options.program === 'Medicare') {
      await this.page.locator('#radio_program_medicare').check();
    } else if (options.program === 'Medicaid') {
      await this.page.locator('#radio_program_medicaid').check();
    } else {
      await this.page.locator('#radio_program_none').check();
    }

    if (options.comment) {
      await this.page.locator('#txt_comment').fill(options.comment);
    }
  } // ✅ FIN DE fillForm

  async pickDateAsUser(date: string) {
    const dateInput = this.page.locator('#txt_visit_date');
    await dateInput.click();
    await dateInput.pressSequentially(date);
    await dateInput.press('Tab');
  }

  async submitWithValidation() {
    await this.page.locator('#btn-book-appointment').click();
  }

  async submitForced() {

    await this.page.locator('form').evaluate(form => {
      (form as HTMLFormElement).submit();
    });
    
}
}

