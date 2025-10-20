import { test, expect } from '@playwright/test';
import Login from '../pages/login';
import testData from '../../resource/testData.json';

test.describe('Login Functionality', () => {
  let login;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await page.goto('https://www.saucedemo.com/');
  });

  test('Locked User should be able to see login error massage when using locked_out_user', async ({
    page,
  }) => {
    await login.clickUsernameField();

    await login.enterUsernameField(testData.Username[0]);
    await login.clickPasswordField();
    await login.enterPasswordField(testData.password);
    await login.clickLoginButton();

    const errorMessage = page.locator('[data-test="error"]');

    //   Assert expected vs actual text
    //   await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
    //   console.log('Error message is visible as expected.');

    // 1. Ensure error appears
    await expect(errorMessage).toBeVisible();
    console.log('Error message is visible as expected.');

    // 2. Log the actual message
    const actualText = await errorMessage.textContent();
    console.log('Error message shown:', actualText?.trim());
  });
});
