import { persistCombineReducers } from 'redux-persist';

import config from 'app/lib/persisting';

import enums from './enums';
import user from './user';
import scheme from './scheme';

export default persistCombineReducers(config,{ enums, user, scheme });
