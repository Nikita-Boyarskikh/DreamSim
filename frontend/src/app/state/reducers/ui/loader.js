import { handleActions } from 'redux-actions';

import { LOADING_START, LOADING_STOP } from 'app/constants/actionTypes';

const initialState = {
  active: false,
};

export default handleActions({
  [LOADING_START]() {
    return {
      active: true
    };
  },

  [LOADING_STOP]() {
    return {
      active: false
    };
  }
}, initialState);
