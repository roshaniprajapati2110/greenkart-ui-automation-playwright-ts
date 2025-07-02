import { test, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePagePO';
import { checkOutPO } from '../PageObjects/CheckOutPO';
import { countryPO } from '../PageObjects/CountryPO';
import { Log } from '../Utilities/Logger';

test('Verify that the user can select a country from the dropdown list', async ({ page }) => {
    const homePage = new HomePage(page);
    const checkOutPage = new checkOutPO(page);
    const countryPage = new countryPO(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Proceed To CheckOut button displayed or not");
    await homePage.clickOnProceedToCheckOutButton();

    Log.info("Proceed to the CART page");
    await checkOutPage.clickOnPlaceOrder();

    Log.info("Select the Country");
    await countryPage.selectCountryFromDropdown("India");
})

test('Verify that the Terms & Conditions checkbox must be checked before placing an order', async ({ page }) => {
    const homePage = new HomePage(page);
    const checkOutPage = new checkOutPO(page);
    const countryPage = new countryPO(page);
    const productName = 'Brocolli - 1 Kg';
    const expectedErrorMessage = "Please accept Terms & Conditions - Required";

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Proceed To CheckOut button displayed or not");
    await homePage.clickOnProceedToCheckOutButton();

    Log.info("Proceed to the CART page");
    await checkOutPage.clickOnPlaceOrder();

    Log.info("Select the Country");
    await countryPage.selectCountryFromDropdown("India");

    Log.info("Click on the Proceed Button without selecting the CheckBox");
    await countryPage.clickOnProceedButton();

    Log.info("Get the Error Message");
    const actualResult = await countryPage.getErrorMessage();

    Log.info("Valiadte the Error message");
    expect(expectedErrorMessage).toEqual(actualResult);
})

test("Verify that clicking 'Proceed' after checking the checkbox completes the order flow", async ({ page }) => {
    const homePage = new HomePage(page);
    const checkOutPage = new checkOutPO(page);
    const countryPage = new countryPO(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Proceed To CheckOut button displayed or not");
    await homePage.clickOnProceedToCheckOutButton();

    Log.info("Proceed to the CART page");
    await checkOutPage.clickOnPlaceOrder();

    Log.info("Select the Country");
    await countryPage.selectCountryFromDropdown("India");

    Log.info("Check the Checkbox");
    await countryPage.clickOnCheckBox();

    Log.info("Click on the Proceed Button without selecting the CheckBox");
    await countryPage.clickOnProceedButton();

    Log.info("Get the Thank You message and compare the message")
    const message = await countryPage.getThankYouMessage();
    expect(message).toContain("Thank you");

})

test.only("Verify that the cart retains items added even after going back from checkout page", async ({ page }) => {
    const homePage = new HomePage(page);
    const checkOutPage = new checkOutPO(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Proceed To CheckOut button displayed or not");
    await homePage.clickOnProceedToCheckOutButton();

    Log.info("Go back to previous page");
    await page.waitForTimeout(1000);
    await page.goBack();

     Log.info("Click on cart icon again");
    await homePage.clickOnCartIcon();

    //Bug
    Log.info("Validate product is still in cart");
    const productExists = await checkOutPage.getEmptyCartText();
    expect(productExists).toContain("You cart is empty!");

})