import { Controller } from '../controller/controller';

export const auth = async (controller: Controller): Promise<void> => {

  //fill name
  await controller.elementAction({
    type: 'addText',
    text: 'Admin',
    cssSelector: 'input[name="username"]',
  });

  //fill password
  await controller.elementAction({
    type: 'addText',
    text: 'admin123',
    cssSelector: 'input[name="password"]',
  });

  //sumbit
  await controller.elementAction({
    type: 'click',
    cssSelector: 'button[type="submit"]',
  });
};