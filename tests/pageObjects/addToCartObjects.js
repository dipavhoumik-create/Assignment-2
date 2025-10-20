export default class AddToCartObjects {
  constructor(page) {
    this.page = page;
    this.humburgerMenu = page.locator("//button[text()='Open Menu']");
    this.resetAppState = page.locator("//a[text()='Reset App State']");
    this.closeMenu = page.locator("//button[text()='Close Menu']");
    this.filterDropdown = page.locator("//select[@data-test='product-sort-container']");
    // this.filterOptionZtoA = page.locator("//option[@value='za']");
    // this.filterOptionAtoZ = page.locator("//option[@value='az']");
    // this.filterOptionLowToHigh = page.locator("//option[@value='lohi']");
    // this.filterOptionHighToLow = page.locator("//option[@value='hilo']");
    this.shoppingCart = page.locator("//a[@data-test='shopping-cart-link']");
    this.checkoutButton = page.locator("//button[text()='Checkout']");
    this.firstnameField = page.locator("//input[@data-test='firstName']");
    this.lastnameField = page.locator("//input[@data-test='lastName']");
    this.zipCodeField = page.locator("//input[@data-test='postalCode']");
    this.continueButton = page.locator("//input[@data-test='continue']");
    this.finishButton = page.locator("//button[text()='Finish']");
    this.backHomeButton = page.locator("//button[text()='Back Home']");
    this.finishButton = page.locator("//button[text()='Finish']");
    this.backHomeButton = page.locator("//button[text()='Back Home']");
    this.logoutButton = page.locator("//a[text()='Logout']");
  }
}
