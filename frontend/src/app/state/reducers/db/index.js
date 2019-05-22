import { combineReducers } from 'redux';

import enums from './enums';
import user from './user';
import scheme from './scheme';

export default combineReducers({ enums, user, scheme });
