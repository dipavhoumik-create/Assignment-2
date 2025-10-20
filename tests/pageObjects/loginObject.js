export default class LogingnObject {
  constructor(page) {
    this.page = page;
    this.usernameFlied = page.locator('//input[@name="user-name"]');
    this.passwordFlied = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//input[@id="login-button"]');
  }
}
