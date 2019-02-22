import { createAction } from 'redux-actions';

import { LOGIN, LOGOUT, SIGNUP } from 'app/constants/actionTypes';

export const login = (username, password) => (dispatch, getState) => {
  const action = createAction(LOGIN);

  dispatch(action({ username, password }));
};

export const logout= (username, password) => (dispatch, getState) => {
  const action = createAction(LOGOUT);

  dispatch(action({ username, password }));
};

export const signup = (username, password) => (dispatch, getState) => {
  const action = createAction(SIGNUP);

  dispatch(action({ username, password }));
};
