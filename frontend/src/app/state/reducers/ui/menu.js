import { handleActions } from 'redux-actions';
import { CLOSE_MENU, OPEN_MENU, TOGGLE_MENU } from '../../../constants/actionTypes';

const initialState = { isOpen: false };

export default handleActions(initialState, {
  [OPEN_MENU](state, action) {
    return { isOpen: true };
  },

  [CLOSE_MENU](state, action) {
    return { isOpen: false };
  },

  [TOGGLE_MENU](state, action) {
    return { isOpen: !state.isOpen };
  },
});
