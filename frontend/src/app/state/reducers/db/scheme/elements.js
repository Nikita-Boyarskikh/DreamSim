import { handleActions } from 'redux-actions';
import { ADD_SCHEME_ELEMENT } from 'app/constants/actionTypes';

const initialState = [];

export default handleActions({
  [ADD_SCHEME_ELEMENT](state, action) {

    console.log("ADD_SCHEME_ELEMENT");

    return state;
  }
}, initialState);
