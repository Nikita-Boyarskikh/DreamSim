import { combineReducers } from 'redux';

import menu from './menu';
import loader from './loader';
import pageTitle from './pageTitle';
import i18n from './i18n';

export default combineReducers({
  menu, loader, pageTitle, i18n
});
