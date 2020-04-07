import Cookies from 'js-cookie';
import { getJSON, createAction } from 'redux-api-middleware';
import { normalize } from 'normalizr/dist/normalizr';

import { LOADING_START, LOADING_STOP } from 'app/constants/actionTypes';
import { handleActions } from 'redux-actions';

export const getNormalizedInitialState = () => ({
  entities: {},
  ids: [],
});

export const createApiAction = ({
  endpoint,
  method = 'GET',
  headers,
  credentials = 'include',
  success,
  schema,
}) => (body) => createAction({
  body: JSON.stringify(body),
  credentials,
  endpoint,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
    ...headers,
  },
  method,
  types: [
    LOADING_START,
    {
      payload: (action, state, res) => getJSON(res).
        then((json) => json && normalize(json, schema)),
      type: success,
    },
    LOADING_STOP,
  ],
});

export const handleSetNormalizedData = (actionType, schema, otherActions = {}) => handleActions(
  {
    [actionType](state, action) {
      return {
        entities: action.payload.entities[schema.key],
        ids: action.payload.result,
      };
    },

    ...otherActions,
  },
  getNormalizedInitialState(),
);
