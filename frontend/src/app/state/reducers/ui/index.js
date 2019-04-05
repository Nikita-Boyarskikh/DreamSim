import { combineReducers } from 'redux';

import menu from './menu';
import loader from './loader';
import pageTitle from './pageTitle';

export default combineReducers({
  menu, loader, pageTitle
});
