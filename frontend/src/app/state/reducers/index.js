import { combineReducers } from 'redux';
import ui from './ui';
import db from './db';
import user from './user';

export default combineReducers({
  db,
  local:  combineReducers({ ui, user }),
  vendor: combineReducers(),
});
