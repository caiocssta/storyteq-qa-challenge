import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import path from "path";
import fs from "fs";


// Paths for screenshots
const tempScreenshotDir = path.resolve(__dirname, '../temp-screenshots');
const tempScreenshotPath = path.join(tempScreenshotDir, 'current.png');
const baselineScreenshotPath = path.resolve(__dirname, '../helpers/gifss.png');

export class VisualPage extends BasePage {
    readonly page: Page
    readonly dynamicGifSelector: string

    constructor (page: Page) {
        super(page)
        this.page = page
        this.dynamicGifSelector = '[src="https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif"]'

        // Ensure the temp directory exists
        if (!fs.existsSync(tempScreenshotDir)) {
            fs.mkdirSync(tempScreenshotDir);
        }
    }

    async open () {
        await this.page.goto('/visual')
    }

    async freezeGifOnFirstFrame () {
        await this.page.evaluate((selector) => {
            const gif = document.querySelector<HTMLImageElement>(selector);
            if (gif) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (context) {
                    canvas.width = gif.width;
                    canvas.height = gif.height;
                    const img = new Image();
                    img.src = gif.src;
                    img.onload = () => {
                        context.drawImage(img, 0, 0, gif.width, gif.height);
                        gif.replaceWith(canvas); // Replace GIF with canvas
                    };
                }
            }
        }, this.dynamicGifSelector);
    }

    async takePageScreenshot () {
        return await this.page.screenshot({path: tempScreenshotPath});
    }

    async compareScreenshot () {
        // Load the new and baseline screenshots
        const newScreenshot = fs.readFileSync(tempScreenshotPath);
        const baselineScreenshot = fs.readFileSync(baselineScreenshotPath);

        // Compare the screenshots
        expect(newScreenshot).toEqual(baselineScreenshot);

        // Clean up: Delete the temporary folder
        fs.rmSync(tempScreenshotDir, {recursive: true, force: true});
    }
}
