import AddToCartObjects from '../pageObjects/addToCartObjects';

export default class AddToCart {
  constructor(page) {
    this.page = page;
    this.locate = new AddToCartObjects(page);
  }
  async clickHumburgerMenu() {
    await this.locate.humburgerMenu.click();
  }
  async clickResetAppState() {
    await this.locate.resetAppState.click();
  }
  async clickCloseMenu() {
    await this.locate.closeMenu.click();
  }
  async clickshoppingCartButton() {
    await this.locate.shoppingCart.click();
  }
  async clickCheckoutButton() {
    await this.locate.checkoutButton.click();
  }
  async enterFirstnameField(firstname) {
    await this.locate.firstnameField.fill(firstname);
  }
  async enterLastnameField(lastname) {
    await this.locate.lastnameField.fill(lastname);
  }
  async enterZipCodeField(zipcode) {
    await this.locate.zipCodeField.fill(zipcode);
  }
  async clickContinueButton() {
    await this.locate.continueButton.click();
  }
  async clickFinishButton() {
    await this.locate.finishButton.click();
  }
  async clickBackHomeButton() {
    await this.locate.backHomeButton.click();
  }
  async clickLogoutButton() {
    await this.locate.logoutButton.click();
  }

  async selectFilterOption() {
    await this.locate.filterDropdown.click();
    await this.page.waitForTimeout(3000);
  }
  async selectFilterOptionZA(option) {
    await this.locate.filterDropdown.selectOption(option);
  }
}
