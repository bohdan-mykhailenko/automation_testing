import { Controller } from '../controller/controller';

export const deleteTestRecord = async (controller: Controller, testName: string): Promise<boolean | number> => {
  await controller.waitElement('.oxd-table .oxd-table-body');
  await controller.waitElement('.oxd-table .oxd-table-body > .oxd-table-card > .oxd-table-row');

  //find test record
  const [i] = await controller.findTargetElement(controller, testName);
  const testRecord = `.oxd-table .oxd-table-card:nth-child(${i})`;

  //delete test record
  await controller.elementAction({
    type: 'click',
    cssSelector: `${testRecord} .oxd-table-row .oxd-table-cell:nth-child(6) div > button`,
  });
  await controller.waitElement('.orangehrm-modal-footer');
  await controller.elementAction({
    type: 'click',
    cssSelector: '.orangehrm-modal-footer button:last-child',
  });

  //check id delete test record
  const [j, isDeleteRecord] = await controller.findTargetElement(controller, testName, true);

  return isDeleteRecord
};