import { By, until, WebDriver, WebElement, WebElementCondition } from 'selenium-webdriver';
import { ElementAction, CheckTextValue, GetDropdownItem } from '../types/types';

export class Controller {

  private driver: WebDriver;
  private waitTime = 2000000;

  constructor(driver: WebDriver, waitTime?: number) {
    this.driver = driver;
    if (waitTime) {
      this.waitTime = waitTime;
    }
  }

  async elementAction(action: ElementAction): Promise<void> {
    const { cssSelector, type, text } = action;
    const targetElement = this.getElement(cssSelector);

    if (!targetElement) {
      throw Error;
    }

    switch (type) {
      case 'click':
        await targetElement.click();
        break;
      case 'tripleClick':
        await targetElement.click();
        await targetElement.click();
        await targetElement.click();
        break;
      case 'addText':
        await targetElement.sendKeys(text || '');
        break;

    }
  }

  getElement(cssSelector: string): WebElement | null {
    const locator = By.css(cssSelector);
    let targetElement: WebElement | null;

    try {
      targetElement = this.driver.findElement(locator);
    } catch {
      targetElement = null;
    }

    return targetElement;
  }

  async getAllElement(cssSelector: string): Promise<WebElement[] | null> {
    const locator = By.css(cssSelector);
    let targetElement: WebElement[] | null;

    try {
      targetElement = await this.driver.findElements(locator);
    } catch {
      targetElement = null;
    }

    return targetElement;
  }


  async clickDropDownItem(getDropdownItem: GetDropdownItem): Promise<void> {
    const { dropdownCssSelector, dropdownItemCssSelector } = getDropdownItem;

    await this.waitElement(dropdownCssSelector);

    await this.elementAction({
      type: 'click',
      cssSelector: dropdownCssSelector,
    });

    await this.waitElement(dropdownItemCssSelector);

    await this.elementAction({
      type: 'click',
      cssSelector: dropdownItemCssSelector,
    });
  }

  async isElementContainText(checkTextValue: CheckTextValue): Promise<boolean> {
    const { targetElementCssSelector, text } = checkTextValue;
    const targetElement = this.getElement(targetElementCssSelector);

    if (!targetElement) {
      throw Error;
    }

    return (await targetElement.getText()).trim() === text.trim();
  }

  async findTargetElement(controller: Controller, text: string, deleteRecord?: boolean) {
    let isDeleteRecord: boolean = true;
    let allUserRecords = await controller.getAllElement(
      '.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row',
    );

    if (!allUserRecords || !allUserRecords?.length) {
      if (deleteRecord) {
        isDeleteRecord = false
        return [0, true]
      } else {
        throw Error;
      }
    }

    let i = 1;

    for (const item of allUserRecords) {
      const record = await item.findElement(By.css('.oxd-table-cell:nth-child(2) div'));

      if ((await record.getText()).trim() === text.trim()) {
        isDeleteRecord = false
        break;
      }

      i++;
    }
    return [i, isDeleteRecord]
  }

  async waitElementUntilLocated(waitEndCondition: WebElementCondition): Promise<void> {
    await this.driver.wait(waitEndCondition, this.waitTime);
  }

  async waitElement(waitedElementCssSelector: string): Promise<void> {
    await this.driver.wait(until.elementLocated(By.css(waitedElementCssSelector)), this.waitTime);
  }

  async loadPage(url: string, pageLoadCondition: WebElementCondition | undefined = undefined): Promise<void> {
    await this.driver.get(url);

    if (pageLoadCondition) {
      await this.driver.wait(pageLoadCondition, this.waitTime);
    }
  }

  async closeBrowser(): Promise<void> {
    await this.driver.quit();
  }
}