export type GetDropdownItem = {
  dropdownCssSelector: string;
  dropdownItemCssSelector: string;
};

export type ElementAction = {
  cssSelector: string;
  type: ActionType;
  text?: string;
};

export type CheckTextValue = {
  targetElementCssSelector: string;
  text: string;
};

export type ActionType = 'click' | 'addText' | 'tripleClick';
