import { createAction } from 'redux-actions';

import { createApiAction } from 'app/lib/api';
import urls from 'app/constants/urls';
import { GET_USER, SET_USER } from 'app/constants/actionTypes';
import { userSchema } from 'app/lib/api/schema/user';

const fetchUser = createApiAction({
  endpoint: urls.api.v1.user,
  success: SET_USER,
  schema: userSchema
});
export const getUser = () => async dispatch => {
  const action = createAction(GET_USER);
  dispatch(action());
  await dispatch(fetchUser());
};
