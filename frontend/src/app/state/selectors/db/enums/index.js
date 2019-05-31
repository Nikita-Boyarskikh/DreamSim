import urls from 'app/constants/urls';

export const menuItemsFromEnums = (enums) =>
  enums.map(tool => ({
    name: tool.value,
    url: urls.tools[tool.name.toLowerCase()]
  }));
