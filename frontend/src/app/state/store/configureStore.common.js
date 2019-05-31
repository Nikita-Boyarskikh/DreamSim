import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore as createReduxStore } from 'redux';

import createRootReducer from 'app/state/reducers';
import apiMiddleware from 'app/state/middlewares/api';
import integrationMiddleware from 'app/state/middlewares/integrationMiddleware';

export const history = createBrowserHistory();

export const commonMiddlewares = [
  routerMiddleware(history),
  thunk,
  apiMiddleware,
  integrationMiddleware
];

export function createStore(middlewares, compose, initialState) {
  return createReduxStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}
