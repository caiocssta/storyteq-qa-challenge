import {test, expect} from "@playwright/test"
import {AuthenticationPage} from "../pages/AuthenticationPage"

// Get email and password from .env file
const email: string = process.env.EMAIL ?? ""
const password: string = process.env.PASSWORD ?? ""

test.describe('Validate log in functionality', async () => {
    var authPage: AuthenticationPage
    test.beforeEach(async ({page}) => {
        authPage = new AuthenticationPage(page)
        await authPage.open()
    })

    test('User can log in', async () => {
        // Fill user email
        await authPage.fillEmail(email)

        // Fill user password
        await authPage.fillPassword(password)

        // Click on submit
        await authPage.submitLogin()

        // Validate if logout button is visible
        expect(await authPage.isLogOutVisible()).toBeTruthy()
    })

    test('User cannot log in (wrong credentials)', async () => {
        // Fill user email
        await authPage.fillEmail("email")

        // Fill user password
        await authPage.fillPassword("password")

        // Click on submit
        await authPage.submitLogin()

        // Validate if error message is visible
        expect(await authPage.isErrorMessageVisible()).toBeTruthy()
    })
})
