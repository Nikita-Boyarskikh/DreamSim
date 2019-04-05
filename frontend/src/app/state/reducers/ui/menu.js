import { handleActions } from 'redux-actions';
import {
  CLOSE_MENU,
  OPEN_MENU,
  TOGGLE_MENU,
} from 'app/constants/actionTypes';

const initialState = {
  isOpen: false,
};

export default handleActions({
  [CLOSE_MENU]() {
    return {
      isOpen: false,
    };
  },

  [OPEN_MENU]() {
    return {
      isOpen: true,
    };
  },

  [TOGGLE_MENU](state) {
    return {
      isOpen: !state.isOpen,
    };
  },
}, initialState);
