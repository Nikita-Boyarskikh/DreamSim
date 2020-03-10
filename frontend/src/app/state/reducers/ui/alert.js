import { handleActions } from 'redux-actions';

import { OPEN_ALERT, CLOSE_ALERT, LOADING_STOP } from 'app/constants/actionTypes';

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
  },

  [LOADING_STOP](state, action) {
    if (action.payload.error && action.payload.response && (action.payload.response.detail || action.payload.response.non_field_errors)) {
      return {
        message: action.payload.response.detail || action.payload.response.non_field_errors.join(', '),
        type: 'error'
      };
    } else {
      return {};
    }
  }
}, initialState);
