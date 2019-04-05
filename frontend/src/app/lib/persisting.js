import storage from 'redux-persist/lib/storage';

import { PERSISTED_STORE_PREFIX, PERSISTED_STORE_VERSION } from 'app/constants/global';
import { isDebug } from 'app/utils';

export default {
  version: PERSISTED_STORE_VERSION,
  storage,
  key: PERSISTED_STORE_PREFIX,
  debug: isDebug
}
