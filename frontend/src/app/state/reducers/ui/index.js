import { combineReducers } from 'redux';

import menu from './menu';
import loader from './loader';
import pageTitle from './pageTitle';
import i18n from './i18n';
import alert from './alert';

export default combineReducers({
  menu, loader, pageTitle, i18n, alert
});
