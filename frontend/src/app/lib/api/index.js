import { getJSON, RSAA } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { LOADING_START, LOADING_STOP } from 'app/constants/actionTypes';

export const createApiAction = ({endpoint, method='GET', headers, credentials='include', success, schema}) => () => ({
  [RSAA]: {
    endpoint,
    method,
    credentials,
    headers: {'Content-Type': 'application/json', ...headers},
    types: [
      LOADING_START,
      {
        type: success,
        payload: (action, state, res) => getJSON(res).then((json) => normalize(json, schema))
      },
      LOADING_STOP
    ]
  }
});
