import { test, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePagePO.ts';
import { Log } from '../Utilities/Logger.ts';

test.describe.only('Home Page Product Functionality', () => {
  test('Verify that the GreenKart homepage loads successfully', async ({ page }) => {

    const homePage = new HomePage(page);

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Get the Header text and validate");
    const headerText = await homePage.getHeaderText();
    expect(headerText).toContain('GREENKART');
  });

  test('Verify that products are displayed on the homepage', async ({ page }) => {
    const homePage = new HomePage(page);

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Compare the product cards count")
    const expectedProductCardCount = 30;
    const actualProductCardCount = await homePage.getProductCardsCount();
    await expect(actualProductCardCount).toBe(expectedProductCardCount);


    Log.info("Get Product Name List and compare the list")
    const ProductNameList = await homePage.getAllProductName();

    Log.info("Print name" + JSON.stringify(ProductNameList));
    const expectedNames = [
      'Brocolli - 1 Kg',
      'Cauliflower - 1 Kg',
      'Cucumber - 1 Kg']

    for (const name of expectedNames) {
      await expect(ProductNameList).toContain(name)
    }
  })

  test.only('Verify that the quantity increases when ' + ' is clicked', async ({ page }) => {
    const homePage = new HomePage(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Get initial quantity");
    const initialQuantity = await homePage.getCurrentProductQuntity(productName);

    Log.info("initialQuantity" + initialQuantity);
    console.log('initialQuantity', initialQuantity);

    await homePage.clickOnIncrementButton(productName, 2);

    const updatedQuantity = await homePage.getCurrentProductQuntity(productName);
    Log.info("updatedQuantity ====" + updatedQuantity);
    console.log("updatedQuantity", updatedQuantity);

    expect(updatedQuantity).toBe(initialQuantity + 2);
  })

  test.only("Verify that the quantity decreases when '-' is clicked, but does not go below 1", async ({ page }) => {
    const homePage = new HomePage(page);
    const productName = 'Brocolli - 1 Kg';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Get initial quantity");
    const initialQuantity = await homePage.getCurrentProductQuntity(productName);

    Log.info("initialQuantity" + initialQuantity);
    console.log('initialQuantity', initialQuantity);

    await homePage.clickOnDecrementButton(productName, 2);

    const updatedQuantity = await homePage.getCurrentProductQuntity(productName);
    Log.info("updatedQuantity ====" + updatedQuantity);
    console.log("updatedQuantity", updatedQuantity);

    expect(updatedQuantity).toBe(initialQuantity);
  })

})

test.describe('Search Input Functionality', () => {
  test('Verify product filtering by typing a partial name (e.g., “br”) into the search bar', async ({ page }) => {
    const homePage = new HomePage(page);

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Search using partial name 'br'");
    await homePage.searchProduct('br');

    Log.info("Get the filtered product names");
    const filteredNames = await homePage.getAllProductName();
    Log.info(filteredNames);

    Log.info("Verify all products contain the keyword 'br'");
    for (const name of filteredNames) {
      await expect(name.toLowerCase()).toContain('br');
    }

    Log.info("Print filtered product list");
    console.log("Filtered Products:", filteredNames);
  })

  test('Verify the placeholder text of the search bar is correct', async ({ page }) => {

    const homePage = new HomePage(page);

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    const placeholderText = await homePage.getPlaceholderText();
    expect(placeholderText).toBe('Search for Vegetables and Fruits');

  })

  test('Verify that the correct product(s) are displayed after a search', async ({ page }) => {
    const homePage = new HomePage(page);
    const ProductName = 'Cauli';

    Log.info("Navigate to the Green kart website");
    await homePage.goto();

    Log.info("Search the 'Cauli' keyword in serch Input")
    await homePage.searchProduct(ProductName);

    Log.info("Get the searched product count and validate that count should be 1")
    const count = await homePage.getProductCardsCount();
    await expect(count).toBe(1);

    Log.info("Validate that searched prduct is displayed");
    await expect(homePage.isProductVisible(ProductName)).toBeTruthy();
  })

  test('Verify that the search results reset when the search bar is cleared', async({page})=>{
     const homePage = new HomePage(page);
    const ProductName = 'Cauli';

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


})
