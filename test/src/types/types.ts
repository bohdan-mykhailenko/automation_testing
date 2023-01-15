type ActionType = 'click' | 'addText' | 'tripleClick';

type ElementAction = {
  cssSelector: string;
  type: ActionType;
  text?: string;
};

type CheckElementTextParam = {
  targetElementCssSelector: string;
  text: string;
};

type GetDropdownItemByCssParam = {
  dropdownCssSelector: string;
  dropdownItemCssSelector: string;
};

export { ActionType, ElementAction, CheckElementTextParam, GetDropdownItemByCssParam };