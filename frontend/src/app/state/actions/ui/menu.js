import { createAction } from 'redux-actions';

import { CLOSE_MENU, OPEN_MENU, TOGGLE_MENU } from 'app/constants/actionTypes';

export const toggleMenu = createAction(TOGGLE_MENU);
export const openMenu = createAction(OPEN_MENU);
export const closeMenu = createAction(CLOSE_MENU);
