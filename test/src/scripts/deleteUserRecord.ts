import { By } from 'selenium-webdriver';
import { DriverController } from '../controller/driver.controller';

export const deleteTestRecord = async (driverController: DriverController, testName: string): Promise<boolean> => {
  await driverController.waitCssElement('.oxd-table .oxd-table-body');
  await driverController.waitCssElement('.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row');

  // let allUserRecords = await driverController.getAllElementByCss(
  //   '.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row',
  // );

  // if (!allUserRecords || !allUserRecords?.length) {
  //   throw Error;
  // }

  // let i = 1;
  // for (const item of allUserRecords) {
  //   const record = await item.findElement(By.css('.oxd-table-cell:nth-child(2) div'));

  //   if ((await record.getText()).trim() === testName.trim()) {
  //     break;
  //   }

  //   i++;
  // }
  const [i] = await driverController.findTargetCssElement(driverController, testName);

  const testRecord = `.oxd-table .oxd-table-card:nth-child(${i})`;

  await driverController.elementAction({
    type: 'click',
    cssSelector: `${testRecord} .oxd-table-row .oxd-table-cell:nth-child(6) div > button`,
  });

  await driverController.waitCssElement('.orangehrm-modal-footer');

  await driverController.elementAction({
    type: 'click',
    cssSelector: '.orangehrm-modal-footer button:last-child',
  });

  // allUserRecords = await driverController.getAllElementByCss(
  //   '.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row',
  // );

  // if (!allUserRecords || !allUserRecords.length) {
  //   return true
  // }

  const [isDeleteRecord] = await driverController.findTargetCssElement(driverController, testName, true);

  // for (const item of allUserRecords) {
  //   const record = await item.findElement(By.css('.oxd-table-cell:nth-child(2) div'));
  //   if ((await item.getText()).trim() === testName.trim()) {
  //     return false
  //   }
  // }

  return true
};

