import {Page, Locator} from 'playwright';

export class BasePage {
  constructor (public page: Page) {}

  async isElementVisible (locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch (error) {
      console.error(`Error checking visibility for selector "${ locator }":`, error);
      return false;
    }
  }
}