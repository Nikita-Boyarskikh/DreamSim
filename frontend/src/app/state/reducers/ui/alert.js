import { handleActions } from 'redux-actions';

import { OPEN_ALERT, CLOSE_ALERT } from 'app/constants/actionTypes';

const initialState = {};

export default handleActions({
  [OPEN_ALERT](state, action) {
    return {
      message: action.payload.message,
      type: action.payload.type
    };
  },

  [CLOSE_ALERT]() {
    return {};
  }
}, initialState);
