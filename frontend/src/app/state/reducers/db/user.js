import { handleActions } from 'redux-actions';
import { LOGOUT_SUCCESS, SET_USER } from 'app/constants/actionTypes';

const initialState = {};

export default handleActions({
  [LOGOUT_SUCCESS]() {
    return null;
  },

  [SET_USER](state, action) {
    const userId = action.payload.result;
    return action.payload.entities.users[userId];
  }
}, initialState);
