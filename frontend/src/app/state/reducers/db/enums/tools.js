import { handleActions } from 'redux-actions';
import { SET_TOOLS } from 'app/constants/actionTypes';

const initialState = [];

export default handleActions({
  [SET_TOOLS](state, action) {
    return {
      ids: action.payload.result.tools,
      tools: action.payload.entities.tools,
    }
  }
}, initialState);
