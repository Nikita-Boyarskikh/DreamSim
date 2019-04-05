import { applyMiddleware, createStore } from 'redux';
import reducer from 'app/state/reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

export default (persistedState) => {
  const middlewares = [promise, thunk];

  return createStore(reducer, persistedState, applyMiddleware(...middlewares));
};
