import { createAction } from 'redux-actions';

import { LOGIN, LOGIN_WITH_VK, CONNECT_VK, LOGOUT, SIGNUP } from 'app/constants/actionTypes';

export const login = createAction(LOGIN);

export const loginWithVk = createAction(LOGIN_WITH_VK);
export const connectVk = createAction(CONNECT_VK);

export const logout = createAction(LOGOUT);

export const signUp = createAction(SIGNUP);
