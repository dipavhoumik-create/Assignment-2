import { test, expect } from '@playwright/test';
import testData from '../../resource/testData.json';
import Login from '../pages/login';
import AddToCart from '../pages/addToCart';
import { time } from 'console';
test.describe('Performance Glitch User Functionality', () => {
  let login, addToCart;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    addToCart = new AddToCart(page);
    await page.goto('https://www.saucedemo.com/');
  });
  test('Performance Glitch User should be able to log in and select an e2e journey product to purchase.', async ({
    page,
  }) => {
    await login.clickUsernameField();
    await login.enterUsernameField(testData.Username[2]);
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
    await addToCart.selectFilterOption();
    await addToCart.selectFilterOptionZA(testData.filterOption[1]);
    console.log('User is able to filter products from Z to A');
    const names = await page.$$('.inventory_item_name');
    const prices = await page.$$('.inventory_item_price');
    const buttons = await page.$$('button.btn_inventory');
    // Selecting the frist prodcut after filter
    let selectedProducts = [];
    const productName = await names[0].innerText(); // Get product name
    const productPriceText = await prices[0].innerText(); // e.g., "$29.99"
    const productPrice = parseFloat(productPriceText.replace('$', ''));
    console.log(`Product name: ${productName} | Price: ${productPrice}`); // Log name and price
    await buttons[0].click(); // Click the add to cart button
    selectedProducts.push({ name: productName, price: productPrice }); //storing name and price
    // Verify cart badge shows 1
    const cartCount = await page.locator('.shopping_cart_badge').innerText();
    expect(Number(cartCount)).toBe(1);
    console.log('1 item added to the cart successfully');
    await addToCart.clickshoppingCartButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    console.log('User is able to navigate to the cart page');
    await addToCart.clickCheckoutButton();
    await addToCart.enterFirstnameField(testData.firstname);
    await addToCart.enterLastnameField(testData.lastname);
    await addToCart.enterZipCodeField(testData.zipcode);
    await addToCart.clickContinueButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    console.log('User is able to navigate to the checkout step two page');

    // Verify selected product is displayed in checkout step two page
    const checkoutItemName = await page.locator('.inventory_item_name').innerText();
    const checkoutItemPriceText = await page.locator('.inventory_item_price').innerText();
    const checkoutItemPrice = parseFloat(checkoutItemPriceText.replace('$', ''));
    expect(checkoutItemName).toBe(selectedProducts[0].name);
    expect(checkoutItemPrice).toBe(selectedProducts[0].price);
    console.log('Selected product is displayed in checkout step two page');
    await addToCart.clickFinishButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order!/i);
    console.log('User is able to complete the purchase process successfully');
    await addToCart.clickBackHomeButton();
    await page.waitForLoadState('load'); // wait until the new page fully loads
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User is able to navigate back to home page');
    await addToCart.clickHumburgerMenu();
    await addToCart.clickResetAppState();
    console.log('User is able to reset app state');
    await addToCart.clickLogoutButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    console.log('User is able to logout successfully');
  });
});
