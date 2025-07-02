import { test, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePagePO.ts';
import { Log } from '../Utilities/Logger.ts';

test("Verify that clicking 'ADD TO CART' adds the item to the cart (cart count increases)", async ({ page }) => {
    const homePage = new HomePage(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Get initial cart count");
    const intinalCartCount = await homePage.getCartCount();
    console.log("Initial Count", intinalCartCount)

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Get updated cart count");
    const updatedCartCount = await homePage.getCartCount();
    console.log("updated count", updatedCartCount);

    Log.info("Validate that both count should be same");
    expect(updatedCartCount).toBe(intinalCartCount + 1);
})

test('Verify that multiple products can be added to the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const ProductNameList = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Get initial cart count");
    const intinalCartCount = await homePage.getCartCount();
    console.log("Initial Count", intinalCartCount)

    Log.info('Add multiple product in to the cart')
    for (const productName of ProductNameList) {
        await homePage.clickOnAddToCartButton(productName);
    }

    Log.info("Get updated cart count");
    const updatedCartCount = await homePage.getCartCount();
    console.log("Initial Count", updatedCartCount)

    expect(updatedCartCount).toBe(intinalCartCount + ProductNameList.length);
})

test('Verify that the cart icon shows the correct number and price of items added', async ({ page }) => {
    const homePage = new HomePage(page);
    const ProductNameList = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    let expectedTotalPrice = 0;
    Log.info("Add multiple products and calculate expected total");
    for (const productName of ProductNameList) {
        const price = await homePage.getProductPrice(productName); // e.g., ₹ 120
        console.log('getProductPrice', price);

        const quantity = await homePage.getCurrentProductQuntity(productName); // default 1
        console.log('Quantity', quantity);
        expectedTotalPrice += price * quantity;
        console.log('expectedTotalPrice', expectedTotalPrice);

        await homePage.clickOnAddToCartButton(productName);
    }

    Log.info("Verify cart item count matches");
    const cartCount = await homePage.getCartCount();
    expect(cartCount).toBe(ProductNameList.length);

    Log.info("Verify cart total matches");
    const actualTotal = await homePage.getCartTotalPrice();
    expect(actualTotal).toBe(expectedTotalPrice);
});

test('Verify that clicking the cart icon opens the cart preview', async ({ page }) => {

    const homePage = new HomePage(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Validate the selected Product is displayed in cart");
    const selectedProductList = await homePage.getSelectedProductName();
    console.log(selectedProductList);
    expect(selectedProductList).toContain(productName);

    Log.info("Proceed To CheckOut button displayed or not");
    expect(await homePage.IsProceedToCheckOutButtonVisible()).toBeTruthy();
})

test.only('Verify that clicking PROCEED TO CHECKOUT navigates to the checkout page', async ({ page }) => {

    const homePage = new HomePage(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Proceed To CheckOut button displayed or not");
    await homePage.clickOnProceedToCheckOutButton();

    Log.info("Verify navigation to the checkout page");
    await expect(page).toHaveURL(/.*\/cart/);
})

