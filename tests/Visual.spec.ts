import test from "@playwright/test";
import {VisualPage} from "../pages/VisualPage";

test.describe('Validate page state', () => {
    var visualPage: VisualPage
    test.beforeEach(async ({page}) => {
        visualPage = new VisualPage(page)
        await visualPage.open()
    })

    test('Validate gif in frozen state', async () => {
        // Freeze gif on the first frame
        await visualPage.freezeGifOnFirstFrame()

        // Take a page screenshot
        await visualPage.takePageScreenshot()

        // Compare taken screenshot with existing one
        await visualPage.compareScreenshot()
    })
})
