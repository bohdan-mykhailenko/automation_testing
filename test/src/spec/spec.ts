import 'jasmine';
import { faker } from '@faker-js/faker';
import { Browser, Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { Controller } from '../controller/controller';
import { auth } from '../scripts/auth';
import { addMinMaxSalaries } from '../scripts/fillUserRecord';
import { deleteTestRecord } from '../scripts/deleteUserRecord';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000000;
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
let controller: Controller;
let testName: string;

beforeAll(async () => {
  const option = new Options().addArguments('--start-maximized');
  const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(option).build();

  controller = new Controller(driver);
  testName = faker.name.firstName()

  await controller.loadPage(URL, until.elementLocated(By.css('.oxd-input')));
});

afterEach(async () => {
  await controller.waitElement('body');
});

afterAll(async () => {
  await controller.closeBrowser();
});

describe('test https://opensource-demo.orangehrmlive.com/', () => {
  it('auth work correctly', async () => {
    await auth(controller);

    await controller.waitElementUntilLocated(until.elementLocated(By.css('.oxd-layout')));

    expect(!!(controller.getElement('.oxd-layout'))).toEqual(true);
  });

  it('add user records work correctly', async () => {
    await addMinMaxSalaries(controller, testName);
    await controller.waitElement('.oxd-table-card > .oxd-table-row');

    const [recordIndex] = await controller.findTargetElement(controller, testName);

    const testField = (fieldIndex: number) => {
      return `.oxd-table .oxd-table-card:nth-child(${recordIndex}) .oxd-table-row .oxd-table-cell:nth-child(${fieldIndex})`
    }

    const isName = await controller.isElementContainText({
      text: testName,
      targetElementCssSelector: testField(2),
    });

    const isFromHours = await controller.isElementContainText({
      text: '06:00',
      targetElementCssSelector: testField(3),
    });

    const isToHours = await controller.isElementContainText({
      text: '18:00',
      targetElementCssSelector: testField(4),
    });

    expect(isName).toBe(true);
    expect(isToHours).toBe(true);
    expect(isFromHours).toBe(true);
  });


  it('display and delete user record on admin panel work correctly', async () => {
    const isDeleteTestRecord = await deleteTestRecord(controller, testName);

    expect(isDeleteTestRecord).toBe(true);
  });
});