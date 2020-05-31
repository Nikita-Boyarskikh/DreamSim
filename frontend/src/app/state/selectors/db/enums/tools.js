import urls from 'app/constants/urls';

export const menuItemsFromTools = (tools) => tools.ids.map((toolId) => ({
  name: tools.entities[toolId].value,
  url: urls.tools[tools.entities[toolId].name.toLowerCase()],
}));
