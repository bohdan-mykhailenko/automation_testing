import { By, until } from 'selenium-webdriver';
import { DriverController } from '../controller/driver.controller';

export const addMinMaxSalaries = async (driverController: DriverController, fakeName: string): Promise<void> => {
  const employee: string = 'Odis Adalwin';

  //go to admin
  await driverController.waitCssElement('.oxd-main-menu > .oxd-main-menu-item-wrapper:first-child > .oxd-main-menu-item');
  await driverController.elementAction({
    type: 'click',
    cssSelector: '.oxd-main-menu > .oxd-main-menu-item-wrapper:first-child > .oxd-main-menu-item',
  });

  //go to job and work shifts
  await driverController.wait(until.elementLocated(By.css('.oxd-topbar-body-nav > ul')));
  await driverController.clickDropDownItemByCss({
    dropdownCssSelector: '.oxd-topbar-body-nav > ul li:nth-child(2)',
    dropdownItemCssSelector: '.oxd-topbar-body-nav > ul li:nth-child(2) > .oxd-dropdown-menu > li:nth-child(5)',
  });

  //go to add pannel
  await driverController.waitCssElement('.orangehrm-header-container');
  await driverController.elementAction({
    cssSelector: '.orangehrm-header-container > div:last-child > button:last-child',
    type: 'click',
  });

  //fill name
  await driverController.waitCssElement('.oxd-form > .oxd-form-row:nth-child(1) .oxd-input');
  await driverController.elementAction({
    type: 'addText',
    text: String(fakeName),
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(1) .oxd-input',
  });

  //fill from hours
  await driverController.elementAction({
    type: 'click',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(1) input',
  });
  await driverController.elementAction({
    type: 'tripleClick',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(1) .bi-chevron-down',
  });

  //fill to hours
  await driverController.elementAction({
    type: 'click',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(2) input',
  });
  await driverController.elementAction({
    type: 'click',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(2) .bi-chevron-up',
  });


  //fill assigned employees
  await driverController.elementAction({
    type: 'addText',
    text: String(employee),
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(4)  input',
  });
  await driverController.waitCssElement('.oxd-autocomplete-dropdown');
  await driverController.elementAction({
    type: 'click',
    cssSelector: '.oxd-autocomplete-dropdown > div',
  });

  //submit info
  await driverController.elementAction({
    type: 'click',
    cssSelector: 'button[type="submit"]',
  });

  return;
};

