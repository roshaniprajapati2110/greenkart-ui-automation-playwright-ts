import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly headerText: Locator;
    readonly productCards: Locator;
    readonly productNameList: Locator;
    readonly searchInput: Locator;
    readonly product: Locator;
    readonly cartCount: Locator;
    readonly totalPrice: Locator;
    readonly cartIcon: Locator;
    readonly selectedProductName:Locator;
    readonly proceedToCheckOutButton:Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator("//div[@class='brand greenLogo']");
        this.productCards = page.locator('.products-wrapper .product');
        this.productNameList = page.locator("//h4[@class='product-name']");
        this.searchInput = page.locator('input.search-keyword');//h4[text()='Brocolli - 1 Kg']/parent::div//div[@class='stepper-input']//a[@class='increment']
        this.cartCount = page.locator("xpath=//table//tr[1]//td/strong");
        this.totalPrice = page.locator("//div[@class='cart-info']//tr[2]//strong");
        this.cartIcon = page.locator("xpath=//a[@class='cart-icon']");
        this.selectedProductName = page.locator("//a[@class='cart-icon']/parent::div//p[@class='product-name']");
        this.proceedToCheckOutButton = page.locator("//div[@class='action-block']//button[text()='PROCEED TO CHECKOUT']");

    }
    getProductByName(productName: string) {
        return this.page.locator(`//h4[text()='${productName}']`);
    }

    IncrementIcon(ProductName: string) {
        return this.page.locator(`//h4[text()='${ProductName}']/parent::div//div[@class='stepper-input']//a[@class='increment']`);
    }
    DecrementIcon(ProductName: string) {
        return this.page.locator(`//h4[text()='${ProductName}']/parent::div//div[@class='stepper-input']//a[@class='decrement']`);
    }
    getProductQuntity(ProductName: string) {
        return this.page.locator(`//h4[text()='${ProductName}']/parent::div//input`);
    }
    AddToCartButton(ProductName: string) {
        return this.page.locator(`//h4[text()='${ProductName}']/parent::div//div[@class='stepper-input']//following-sibling::div//button`);
    }
    productPrice(ProductName: string) {
        return this.page.locator(`//h4[text()='${ProductName}']/following-sibling::p`);
    }




    //Methods
    async goto() {
        await this.page.goto('');
    }
    async getHeaderText() {
        return await this.headerText.innerText();
    }

    async getProductCardsCount() {
        return await this.productCards.count();
    }

    async getAllProductName() {
        return await this.productNameList.allInnerTexts();
    }
    async isProductVisible(productName: string) {
        return await this.getProductByName(productName).isVisible();
    }

    async searchProduct(keyword: string) {
        await this.searchInput.click();
        await this.searchInput.fill(keyword);
        await this.page.waitForTimeout(1000);
    }

    async getPlaceholderText() {
        await this.page.waitForTimeout(1000);
        return await this.searchInput.getAttribute('placeholder');
    }

    async clickOnIncrementButton(product: string, times: number = 1) {
        for (let i = 0; i < times; i++) {
            await this.IncrementIcon(product).click();
        }
    }

    async clickOnDecrementButton(product: string, times: number = 2) {
        for (let i = 0; i < times; i++) {
            await this.DecrementIcon(product).click();
        }

    }

    async getCurrentProductQuntity(productName: string): Promise<number> {
        const value = await this.getProductQuntity(productName).inputValue();
        return parseInt(value);
    }

    async clickOnAddToCartButton(productName: string) {
        await this.AddToCartButton(productName).click();
    }

    async getCartCount() {
        const count = await this.cartCount.innerText();
        return parseInt(count, 10)
    }

    async getCartTotalPrice(): Promise<number> {
        const priceText = await this.totalPrice.textContent();
        return parseInt(priceText || '0', 10);
    }

    async getProductPrice(productName: string): Promise<number> {
        const priceText = await this.productPrice(productName).textContent();
        return parseInt(priceText?.replace(/[^\d]/g, '') || '0', 10);
    }

    async clickOnCartIcon(){
        await this.cartIcon.click();
    }

    async getSelectedProductName() {
        return await this.selectedProductName.allInnerTexts();
    }

    async IsProceedToCheckOutButtonVisible(){
        return await this.proceedToCheckOutButton.isVisible();
    }

    async clickOnProceedToCheckOutButton(){
        await this.proceedToCheckOutButton.click();
    }

    async clearSearch() {
    await this.searchInput.fill('');
}
}