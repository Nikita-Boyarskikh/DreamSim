// TODO: use redux-api-middleware

import { API, API_CANCEL } from 'app/constants/actionTypes';
import { API_CANCELLATION_TIMEOUT } from 'app/constants/api';
import Api from 'app/lib/api';

export const canceled = {};

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case API:
      return Api[action.payload.method](action.payload).then((response) => {
        if (action.cancelable && canceled[action.cancelable]) {
          return null;
        }

        return dispatch({
          type: action.payload.success,
          response,
        });
      });
    case API_CANCEL:
      canceled[action.id] = true;
      setTimeout(() => delete canceled[action.id], API_CANCELLATION_TIMEOUT);
      break;
    default:
      return null;
  }

  return next(action);
};

export default apiMiddleware;
