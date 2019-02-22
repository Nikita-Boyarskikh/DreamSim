import { applyMiddleware, createStore } from 'redux';
import { default as reducer } from '../reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

export default (persistedState) => {
  const middlewares = [promise, thunk];

  return createStore(reducer, persistedState, applyMiddleware(...middlewares));
};
