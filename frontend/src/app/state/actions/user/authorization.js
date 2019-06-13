import { createAction } from 'redux-actions';

import { createApiAction } from 'app/lib/api';
import {
  LOGIN, LOGIN_WITH_VK, CONNECT_VK, LOGOUT, SIGNUP,
  SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS
} from 'app/constants/actionTypes';
import urls from 'app/constants/urls';
import { authKeySchema } from 'app/lib/api/schema/user';

const postLogin = createApiAction({
  method: 'POST',
  endpoint: urls.api.v1.auth.login,
  success: LOGIN_SUCCESS,
  schema: authKeySchema
});
export const login = (data) => dispatch => {
  const action = createAction(LOGIN);
  dispatch(action());
  dispatch(postLogin(data));
};

export const loginWithVk = createAction(LOGIN_WITH_VK);
export const connectVk = createAction(CONNECT_VK);

const postSignUp = createApiAction({
  method: 'POST',
  endpoint: urls.api.v1.auth.registration,
  success: SIGNUP_SUCCESS,
  schema: authKeySchema
});
export const signUp = (data) => dispatch => {
  const action = createAction(SIGNUP);
  dispatch(action());
  dispatch(postSignUp(data));
};

const postLogout = createApiAction({
  method: 'POST',
  endpoint: urls.api.v1.auth.logout,
  success: LOGOUT_SUCCESS
});
export const logout = () => dispatch => {
  const action = createAction(LOGOUT);
  dispatch(action());
  dispatch(postLogout());
};
