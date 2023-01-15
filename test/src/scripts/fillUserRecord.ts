import { By, until } from 'selenium-webdriver';
import { Controller } from '../controller/controller';

export const addMinMaxSalaries = async (controller: Controller, fakeName: string): Promise<void> => {
  const employee: string = 'Odis Adalwin';

  //go to admin panel
  await controller.waitElement('.oxd-main-menu > .oxd-main-menu-item-wrapper:first-child > .oxd-main-menu-item');
  await controller.elementAction({
    type: 'click',
    cssSelector: '.oxd-main-menu > .oxd-main-menu-item-wrapper:first-child > .oxd-main-menu-item',
  });

  //go to job and work shifts
  await controller.waitElementUntilLocated(until.elementLocated(By.css('.oxd-topbar-body-nav > ul')));
  await controller.clickDropDownItem({
    dropdownCssSelector: '.oxd-topbar-body-nav > ul li:nth-child(2)',
    dropdownItemCssSelector: '.oxd-topbar-body-nav > ul li:nth-child(2) > .oxd-dropdown-menu > li:nth-child(5)',
  });

  //go to add panel
  await controller.waitElement('.orangehrm-header-container');
  await controller.elementAction({
    cssSelector: '.orangehrm-header-container > div:last-child > button:last-child',
    type: 'click',
  });

  //fill name
  await controller.waitElement('.oxd-form > .oxd-form-row:nth-child(1) .oxd-input');
  await controller.elementAction({
    type: 'addText',
    text: String(fakeName),
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(1) .oxd-input',
  });

  //fill from hours
  await controller.elementAction({
    type: 'click',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(1) input',
  });
  await controller.elementAction({
    type: 'tripleClick',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(1) .bi-chevron-down',
  });

  //fill to hours
  await controller.elementAction({
    type: 'click',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(2) input',
  });
  await controller.elementAction({
    type: 'click',
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(3) > div > div:nth-child(2) .bi-chevron-up',
  });

  //fill assigned employee
  await controller.elementAction({
    type: 'addText',
    text: String(employee),
    cssSelector: '.oxd-form > .oxd-form-row:nth-child(4)  input',
  });
  await controller.waitElement('.oxd-autocomplete-dropdown');
  await controller.elementAction({
    type: 'click',
    cssSelector: '.oxd-autocomplete-dropdown > div',
  });

  //submit 
  await controller.elementAction({
    type: 'click',
    cssSelector: 'button[type="submit"]',
  });

  return;
};