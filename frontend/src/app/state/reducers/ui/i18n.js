import { handleActions } from 'redux-actions';
import { I18N_INIT } from 'app/constants/actionTypes';

const initialState = false;
export default handleActions({
  [I18N_INIT]() {
    return true;
  }
}, initialState);
