import { Locator, Page} from "@playwright/test";
import { promises } from "dns";

export class countryPO {

     readonly page: Page;
     readonly proceedButton :Locator;
     readonly selectCountry:Locator;
     readonly errorMessage:Locator;
     readonly checkbox:Locator;
     readonly thankYouMessage : Locator;

    constructor(page){
        this.page = page;
        this.proceedButton = page.getByRole('button',{name:'Proceed'});
        this.selectCountry = page.locator("//div[@class='products']//select");
        this.errorMessage = page.locator("//span[@class='errorAlert']//b");
        this.checkbox = page.locator(".chkAgree");
        this.thankYouMessage= page.locator("//div[@class='wrapperTwo']//span[@style]");
    }

    async isProceedButtonVisible():Promise<boolean>{
        return await this.proceedButton.isVisible();
    }

    async clickOnProceedButton(){
        await this.proceedButton.click();
    }
    async selectCountryFromDropdown(country: string){
        await this.selectCountry.selectOption(country);
    }

    async getErrorMessage(){
        return this.errorMessage.innerText();
    }

    async clickOnCheckBox(){
        await this.checkbox.check();
    }

    async getThankYouMessage(){
        return this.thankYouMessage.innerText();
    }
}