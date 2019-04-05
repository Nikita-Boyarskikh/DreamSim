import { createAction } from 'redux-actions';

import { LOGIN, LOGIN_WITH_VK, LOGOUT, SIGNUP } from 'app/constants/actionTypes';

export const login = createAction(LOGIN);

export const loginWithVk = createAction(LOGIN_WITH_VK);

export const logout = createAction(LOGOUT);

export const signup = createAction(SIGNUP);
