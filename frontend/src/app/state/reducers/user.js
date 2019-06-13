import { handleActions } from 'redux-actions';
import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from 'app/constants/actionTypes';

const initialState = {
  authKey: null,
};

export default handleActions({
  [SIGNUP_SUCCESS](state, action) {
    return { authKey: action.payload.result };
  },

  [LOGIN_SUCCESS](state, action) {
    return { authKey: action.payload.result };
  },

  [LOGOUT_SUCCESS]() {
    return { authKey: null };
  }
}, initialState);
