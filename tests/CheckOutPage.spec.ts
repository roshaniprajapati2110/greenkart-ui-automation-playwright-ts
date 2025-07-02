import { test, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePagePO';
import { Log } from '../Utilities/Logger';
import { checkOutPO } from '../PageObjects/CheckOutPO';
import { countryPO } from '../PageObjects/CountryPO';

test('Verify that the total price is correctly calculated on the checkout page', async ({ page }) => {

    const homePage = new HomePage(page);
    const checkOutPage = new checkOutPO(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    const initalQuanity = await homePage.getCurrentProductQuntity(productName);
    console.log('getinitalQuanity', initalQuanity);

    const initalPrice = await homePage.getProductPrice(productName);
    console.log('getinitalQuanity', initalPrice);

    Log.info("Click on the Add To Cart button");
    await homePage.clickOnAddToCartButton(productName);

    Log.info("Click on the Cart icon");
    await homePage.clickOnCartIcon();

    Log.info("Proceed To CheckOut button displayed or not");
    await homePage.clickOnProceedToCheckOutButton();

    Log.info("Get the ProductName from CheckOut page");
    const updatedProductName = await checkOutPage.getProductName();
    console.log('updatedProductName', updatedProductName);
    expect(updatedProductName).toContain(productName);

    Log.info("Get the Product Quantity from Checkout page");
    const updatedQuantities = await checkOutPage.getProductQuantity();
    console.log('Updated Quantity:', updatedQuantities);
    expect(updatedQuantities).toBe(initalQuanity);


    Log.info("Get the Product Price from Checkout page");
    const updatedPrice = await checkOutPage.getProductPrice();
    console.log('Updated Quantity:', updatedQuantities);
    expect(updatedPrice).toBe(initalPrice);


    Log.info("Get the Product Quantity from Checkout page");
    const updatedTotalPrice = await checkOutPage.getProductTotalPrice();
    console.log('Updated Quantity:', updatedQuantities);
    expect(updatedTotalPrice).toBe(initalPrice * initalQuanity);

})


test("Verify that clicking 'Place Order' takes the user to the country selection page", async ({ page }) => {

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

    Log.info("Verify navigation to the checkout page");
    await expect(page).toHaveURL(/.*\/country/);

    Log.info("Verify Proceed button is visible on country page");
    expect(await countryPage.isProceedButtonVisible()).toBeTruthy();
})

test.only('Verify that the search results reset when the search bar is cleared', async({page})=>{
     const homePage = new HomePage(page);
    const ProductName = 'Tomato';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Capture all product names before filtering");
    const initialProducts = await homePage.getAllProductName();

    Log.info("Search the 'Cauli' keyword in serch Input")
    await homePage.searchProduct(ProductName);

    const filteredProducts = await homePage.getAllProductName();
    expect(filteredProducts.length).toBeLessThanOrEqual(initialProducts.length);
    expect(filteredProducts.every(p => p.toLowerCase().includes('tomato'))).toBeTruthy();

    Log.info("Clear the search input");
    await homePage.clearSearch();

    const resetProducts = await homePage.getAllProductName();
    expect(resetProducts.length).toEqual(initialProducts.length);

  })