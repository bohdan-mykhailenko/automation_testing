import 'jasmine';
import { faker } from '@faker-js/faker';
import { Browser, Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { DriverController } from './controller/driver.controller';
import { auth } from './scripts/auth';
import { addMinMaxSalaries } from './scripts/fillUserRecord';

import { deleteTestRecord } from './scripts/deleteUserRecord';
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';


jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

let driverController: DriverController;
let testName: string;
beforeAll(async () => {
  const option = new Options().addArguments('--start-maximized');
  const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(option).build();

  driverController = new DriverController(driver);
  testName = faker.name.firstName()

  await driverController.loadPage(URL, until.elementLocated(By.css('.oxd-input')));
});

afterEach(async () => {
  await driverController.waitCssElement('body');
});

afterAll(async () => {
  await driverController.closeBrowser();
});

describe('test https://opensource-demo.orangehrmlive.com/', () => {
  it('auth work correctly', async () => {
    await auth(driverController);

    await driverController.wait(until.elementLocated(By.css('.oxd-layout')));

    expect(!!(driverController.getElementByCss('.oxd-layout'))).toEqual(true);
  });

  it('add user records work correctly', async () => {
    await addMinMaxSalaries(driverController, testName);
    await driverController.waitCssElement('.oxd-table-card > .oxd-table-row');

    const [i] = await driverController.findTargetCssElement(driverController, testName);

    const testField = (j: number) => {
      return `.oxd-table .oxd-table-card:nth-child(${i}) .oxd-table-row .oxd-table-cell:nth-child(${j})`
    }

    const isName = await driverController.isCssElementContainThisText({
      text: testName,
      targetElementCssSelector: testField(2),
    });

    const isFrom = await driverController.isCssElementContainThisText({
      text: '06:00',
      targetElementCssSelector: testField(3),
    });

    const isTo = await driverController.isCssElementContainThisText({
      text: '18:00',
      targetElementCssSelector: testField(4),
    });


    expect(isName).toBe(true);
    expect(isTo).toBe(true);
    expect(isFrom).toBe(true);
  });


  it('display and delete user record on admin panel work correctly', async () => {
    const isDeleteTestRecord: boolean = await deleteTestRecord(driverController, testName);

    expect(isDeleteTestRecord).toBe(true);
  });
});
