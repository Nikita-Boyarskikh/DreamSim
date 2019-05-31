import { compose } from 'redux';

import {
  commonMiddlewares,
  createStore,
  history as commonHistory
} from './configureStore.common';

export const history = commonHistory;

export default (persistedState) => {
  return createStore(commonMiddlewares, compose, persistedState);
};
