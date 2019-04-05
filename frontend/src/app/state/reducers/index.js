import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';

import config from 'app/lib/persisting';

import ui from './ui';
import db from './db';
import user from './user';

export default persistCombineReducers(config, {
  db,
  local: combineReducers({
    ui,
    user,
  }),
  // vendor: combineReducers({}),
});
