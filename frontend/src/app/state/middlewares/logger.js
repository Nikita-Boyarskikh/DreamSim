/*
 * TODO: use redux-logger
 * TODO: use redux-immutablejs
 */

import Immutable from 'immutable';

export default (level) => {
  const { createLogger } = require('redux-logger');

  const stateTransformer = (state) => {
    const newState = {};

    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }

    return newState;
  };

  return createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    stateTransformer,
    level,
  });
};
