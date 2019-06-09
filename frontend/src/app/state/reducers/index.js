import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ui from './ui';
import db from './db';
import user from './user';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    db,
    local: combineReducers({
      ui,
      user,
    })
  });
}
