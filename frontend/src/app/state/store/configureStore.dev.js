import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createLogger from 'app/state/middlewares/logger';

import {
  history as commonHistory,
  commonMiddlewares,
  createStore
} from './configureStore.common';
import createRootReducer from 'app/state/reducers';

export const history = commonHistory;

export default (initialState) => {
  const logger = createLogger('debug');
  const middlewares = commonMiddlewares.concat([logger]);

  const composeEnhancers = composeWithDevTools({
    latency: 500,
    maxAge: 50,
    trace: true,
    traceLimit: 10
  });

  const store = createStore(middlewares, composeEnhancers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};
