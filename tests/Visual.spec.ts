import test from "@playwright/test";
import {VisualPage} from "../pages/VisualPage";

test.describe('Validate page state', () => {
    var visualPage: VisualPage
    test.beforeEach(async ({page}) => {
        visualPage = new VisualPage(page)
        await visualPage.open()
    })

    test('Validate gif in frozen state', async () => {
        await visualPage.freezeGifOnFirstFrame()
        await visualPage.takePageScreenshot()
        await visualPage.compareScreenshot()
    })
})
