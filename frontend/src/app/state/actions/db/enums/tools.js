import { createAction } from 'redux-actions';

import urls from 'app/constants/urls';
import { LOAD_TOOLS, SET_TOOLS } from 'app/constants/actionTypes';
import { toolSchema } from 'app/lib/api/schema/enums/tools';
import { createApiAction } from 'app/lib/api';

export const fetchTools = createApiAction({
  endpoint: urls.api.v1.enums.tools,
  success: SET_TOOLS,
  schema: [toolSchema]
});

export const loadTools = () => async dispatch => {
  const action = createAction(LOAD_TOOLS);
  dispatch(action());
  await dispatch(fetchTools());
};
