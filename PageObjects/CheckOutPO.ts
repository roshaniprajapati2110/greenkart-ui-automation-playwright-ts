import { Locator, Page } from '@playwright/test';

export class checkOutPO {

    readonly page: Page;

    readonly productName: Locator;
    readonly productQuantity: Locator;
    readonly productPrice: Locator;
    readonly productTotalPrice: Locator;
    readonly placeOrder: Locator;
    readonly emptyCart : Locator;

    constructor(page) {
        this.page = page;
        this.productName = page.locator("//div[@class='products']//tbody//p[@class='product-name']");
        this.productQuantity = page.locator("//div[@class='products']//tbody//p[@class='quantity']");
        this.productPrice = page.locator("//div[@class='products']//tbody//td[4]//p[@class='amount']");
        this.productTotalPrice = page.locator("//div[@class='products']//tbody//td[5]//p[@class='amount']");
        this.placeOrder = page.getByRole('button', { name: 'Place Order' });
        this.emptyCart = page.locator("//div[contains(@class,'cart-preview')]//div[@class='empty-cart']//h2");
    }


    //Methods
    async getProductName() {
        return await this.productName.innerText();
    }

    async getProductQuantity() {
        let productQuantity = await this.productQuantity.innerText();
        return parseInt(productQuantity);
    }

    async getProductPrice() {
        let productPrice = await this.productPrice.innerText();
        return parseInt(productPrice);
    }

    async getProductTotalPrice() {
        let productTotalPrice = await this.productTotalPrice.innerText();
        return parseInt(productTotalPrice);
    }
    async clickOnPlaceOrder() {
        await this.placeOrder.click();
    }

    async getEmptyCartText(){
        return this.emptyCart.innerText();
    }
}