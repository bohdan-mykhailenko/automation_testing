import { By, until, WebDriver, WebElement, WebElementCondition } from 'selenium-webdriver';
import { ElementAction, CheckElementTextParam, GetDropdownItemByCssParam } from '../types/types';

export class DriverController {
  private driver: WebDriver;
  private waitTime = 30000000;

  constructor(driver: WebDriver, waitTime?: number) {
    this.driver = driver;
    if (waitTime) {
      this.waitTime = waitTime;
    }
  }

  async loadPage(url: string, pageLoadCondition: WebElementCondition | undefined = undefined): Promise<void> {
    await this.driver.get(url);

    if (pageLoadCondition) {
      await this.driver.wait(pageLoadCondition, this.waitTime);
    }
  }

  getElementByCss(cssSelector: string): WebElement | null {
    const locator = By.css(cssSelector);
    let targetElement: WebElement | null;

    try {
      targetElement = this.driver.findElement(locator);
    } catch {
      targetElement = null;
    }

    return targetElement;
  }

  async getAllElementByCss(cssSelector: string): Promise<WebElement[] | null> {
    const locator = By.css(cssSelector);
    let targetElement: WebElement[] | null;
    try {
      targetElement = await this.driver.findElements(locator);
    } catch {
      targetElement = null;
    }

    return targetElement;
  }

  getCssElementCondition(cssSelector: string): WebElementCondition {
    return until.elementLocated(By.css(cssSelector));
  }

  async clickDropDownItemByCss(targetDropdownMenuParam: GetDropdownItemByCssParam): Promise<void> {
    const { dropdownCssSelector, dropdownItemCssSelector } = targetDropdownMenuParam;

    await this.waitCssElement(dropdownCssSelector);

    await this.elementAction({
      type: 'click',
      cssSelector: dropdownCssSelector,
    });

    await this.waitCssElement(dropdownItemCssSelector);

    await this.elementAction({
      type: 'click',
      cssSelector: dropdownItemCssSelector,
    });
  }

  async isCssElementContainThisText(checkElementTextParam: CheckElementTextParam): Promise<boolean> {
    const { targetElementCssSelector, text } = checkElementTextParam;
    const targetElement = this.getElementByCss(targetElementCssSelector);

    if (!targetElement) {
      throw Error('element does not exist');
    }

    return (await targetElement.getText()).trim() === text.trim();
  }


  async findTargetCssElement(driverController: DriverController, text: string, deleteRecord?: boolean) {
    let isDeleteRecord: boolean = true;
    let allUserRecords = await driverController.getAllElementByCss(
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

  async elementAction(action: ElementAction): Promise<void> {
    const { cssSelector, type, text } = action;
    const targetElement = this.getElementByCss(cssSelector);

    if (!targetElement) {
      throw Error('element does not exist');
    }

    switch (type) {
      case 'click':
        await targetElement.click();
        break;
      case 'addText':
        await targetElement.sendKeys(text || '');
        break;
      case 'tripleClick':
        await targetElement.click();
        await targetElement.click();
        await targetElement.click();
        break;
    }
  }

  async wait(waitEndCondition: WebElementCondition): Promise<void> {
    await this.driver.wait(waitEndCondition, this.waitTime);
  }

  async waitCssElement(waitedElementCssSelector: string): Promise<void> {
    await this.driver.wait(until.elementLocated(By.css(waitedElementCssSelector)), this.waitTime);
  }

  async closeBrowser(): Promise<void> {
    await this.driver.quit();
  }
}

