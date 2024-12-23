import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class AuthenticationPage extends BasePage {

    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly submitLoginBtn: Locator
    readonly logOutLabel: Locator
    readonly errorMessage: Locator

    constructor (page: Page) {
        super(page)
        this.page = page
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.submitLoginBtn = page.locator('#submitLoginBtn')
        this.logOutLabel = page.locator('[href="auth_ecommerce.html"]')
        this.errorMessage = page.getByText('Bad credentials! Please try again! Make sure that you\'ve registered.')
    }

    async open () {
        await this.page.goto('/auth_ecommerce')
    }

    async fillEmail (email: string) {
        await this.emailInput.fill(email)
    }

    async fillPassword (password: string) {
        await this.passwordInput.fill(password)
    }

    async submitLogin () {
        await this.submitLoginBtn.click()
    }

    async isLogOutVisible () {
        return await this.isElementVisible(this.logOutLabel)
    }

    async isErrorMessageVisible () {
        return await this.isElementVisible(this.errorMessage)
    }
}