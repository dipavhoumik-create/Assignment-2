import { test, expect } from '@playwright/test';
import testData from '../../resource/testData.json';
import Login from '../pages/login';
import AddToCart from '../pages/addToCart';
test.describe('Standard User Functionality', () => {
  let login, addToCart;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    addToCart = new AddToCart(page);
    await page.goto('https://www.saucedemo.com/');
  });
  test('Standard User should be able to log in and select an e2e journey product to purchase.', async ({
    page,
  }) => {
    await login.clickUsernameField();
    await login.enterUsernameField(testData.Username[1]);
    await login.clickPasswordField();
    await login.enterPasswordField(testData.password);
    await login.clickLoginButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User is able to login with valid username and password');
    await addToCart.clickHumburgerMenu();
    await addToCart.clickResetAppState();
    console.log('User is able to reset app state');
    await addToCart.clickCloseMenu();
    console.log('User is able to close the menu');

    //  Collect product names, prices, and buttons
    const names = await page.$$('.inventory_item_name');
    const prices = await page.$$('.inventory_item_price');
    const buttons = await page.$$('button.btn_inventory');

    //  Generate 3 random unique indexes
    const indexes = Array.from({ length: buttons.length }, (_, i) => i);
    indexes.sort(() => Math.random() - 0.5);
    const randomIndexes = indexes.slice(0, 3);

    // Store selected product data
    let selectedProducts = [];

    //  Add random products to cart + store name + price
    for (const idx of randomIndexes) {
      const productName = await names[idx].innerText(); // Get product name
      const productPriceText = await prices[idx].innerText(); // e.g., "$29.99"
      const productPrice = parseFloat(productPriceText.replace('$', '')); // Convert to number

      console.log(`Product name: ${productName} | Price: ${productPrice}`); // Log name and price
      await buttons[idx].click(); // Click the add to cart button

      selectedProducts.push({ name: productName, price: productPrice }); //storing name and price
    }
    // Verify cart badge shows 3
    const cartCount = await page.locator('.shopping_cart_badge').innerText();
    expect(Number(cartCount)).toBe(3);
    console.log('3 random items added to the cart successfully');

    await addToCart.clickshoppingCartButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    console.log('User is able to navigate to the cart page');
    await addToCart.clickCheckoutButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    console.log('User is able to navigate to the checkout page');
    await addToCart.enterFirstnameField(testData.firstname);
    await addToCart.enterLastnameField(testData.lastname);
    await addToCart.enterZipCodeField(testData.zipcode);
    await addToCart.clickContinueButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    console.log('User is able to navigate to the checkout overview page');

    // Verify selected products at checkout name
    const checkoutNames = (await page.locator('.inventory_item_name').allInnerTexts()).map((n) =>
      n.trim()
    );
    const selectedNames = selectedProducts.map((p) => p.name);
    console.log('Products at checkout:', checkoutNames);
    console.log('Selected products:', selectedNames);

    // Compare lists ignoring order
    expect(checkoutNames.sort()).toEqual(selectedNames.sort());

    //  On checkout summary page - verify total
    const itemTotalText = await page.locator('.summary_subtotal_label').innerText();
    const displayedItemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));

    // Calculate expected total
    const expectedItemTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);

    console.log(`Expected Item Total: ${expectedItemTotal}`);
    console.log(`Displayed Item Total: ${displayedItemTotal}`);

    expect(displayedItemTotal).toBeCloseTo(expectedItemTotal, 2);

    //  (Optional) Verify with tax
    const taxText = await page.locator('.summary_tax_label').innerText();
    const tax = parseFloat(taxText.replace('Tax: $', ''));

    const totalText = await page.locator('.summary_total_label').innerText();
    const displayedFinalTotal = parseFloat(totalText.replace('Total: $', ''));

    const expectedFinalTotal = expectedItemTotal + tax;

    console.log(`Expected Final Total: ${expectedFinalTotal}`);
    console.log(`Displayed Final Total: ${displayedFinalTotal}`);

    expect(displayedFinalTotal).toBeCloseTo(expectedFinalTotal, 2);

    await addToCart.clickFinishButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order!/i);
    console.log('User is able to complete the purchase process successfully');
    await addToCart.clickBackHomeButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User is able to navigate back to the home page');
    await addToCart.clickHumburgerMenu();
    await addToCart.clickResetAppState();
    console.log('User is able to reset app state');
    await addToCart.clickLogoutButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    console.log('User is able to logout successfully');
  });
});
