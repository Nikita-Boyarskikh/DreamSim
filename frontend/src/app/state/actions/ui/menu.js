import { createAction } from 'redux-actions';

import { CLOSE_MENU, OPEN_MENU, TOGGLE_MENU } from 'app/constants/actionTypes';

export const toggleMenu = () => (dispatch, getState) => {
  const action = createAction(TOGGLE_MENU);

  dispatch(action());
};

export const openMenu = () => (dispatch, getState) => {
  const action = createAction(OPEN_MENU);

  dispatch(action());
};

export const closeMenu = () => (dispatch, getState) => {
  const action = createAction(CLOSE_MENU);

  dispatch(action());
};
