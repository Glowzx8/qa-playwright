import { test as base, Page } from '@playwright/test';

type AuthFixtures = {
    loggedInUser: void;
};

export const test = base.extend<AuthFixtures>({
    loggedInUser: [
        async ({ page }: { page: Page }, use) => {
            await page.goto('/');
            await page.getByRole('link', { name: 'Make Appointment' }).click();
            await page.getByLabel('Username').fill('John Doe');
            await page.getByLabel('Password').fill('ThisIsNotAPassword');
            await page.getByRole('button', { name: 'Login' }).click();

            await use();
        },
        { auto: true },
    ],
});

export { expect } from '@playwright/test';
