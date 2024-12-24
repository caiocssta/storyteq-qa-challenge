import {test, expect} from "@playwright/test"
import {AuthenticationPage} from "../pages/AuthenticationPage"

const email: string = process.env.EMAIL ?? ""
const password: string = process.env.PASSWORD ?? ""

test.describe('Validate log in functionality', async () => {
    var authPage: AuthenticationPage
    test.beforeEach(async ({page}) => {
        authPage = new AuthenticationPage(page)
        await authPage.open()
    })

    test('User can log in', async () => {
        await authPage.fillEmail(email)
        await authPage.fillPassword(password)
        await authPage.submitLogin()
        expect(await authPage.isLogOutVisible()).toBeTruthy()
    })

    test('User cannot log in (wrong credentials)', async () => {
        await authPage.fillEmail("email")
        await authPage.fillPassword("password")
        await authPage.submitLogin()
        expect(await authPage.isErrorMessageVisible()).toBeTruthy()
    })
})
