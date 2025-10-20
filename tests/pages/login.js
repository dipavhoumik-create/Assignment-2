import LogingnObject from '../pageObjects/loginObject';

export default class Login {
  constructor(page) {
    this.page = page;
    this.locate = new LogingnObject(page);
  }
  async clickUsernameField() {
    await this.locate.usernameFlied.click();
  }

  async enterUsernameField(text) {
    await this.locate.usernameFlied.fill(text);
    // await this.waitfor(1000);
  }
  async clickPasswordField() {
    await this.locate.passwordFlied.click();
  }
  async enterPasswordField(text) {
    await this.locate.passwordFlied.fill(text);
    // await this.waitfor(1000);
  }
  async clickLoginButton() {
    await this.locate.loginButton.click();
  }
}
