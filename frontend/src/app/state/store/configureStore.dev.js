import { applyMiddleware, compose, createStore } from 'redux';
import { default as reducer } from 'app/state/reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

export default (persistedState) => {
  const middlewares = [promise, thunk],
        logger = configureLogger('debug');

  middlewares.push(logger);

  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...middlewares),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
};
