import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from 'app/state/reducers';

export default (initialState) => {
  const middlewares = [promise, thunk];
  const logger = createLogger('debug');

  middlewares.push(logger);
  const composeEnhancers = composeWithDevTools({
    latency: 500,
    maxAge: 50,
    trace: true,
    traceLimit: 10
  });

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
};
