import { handleActions } from 'redux-actions';

const initialState = {
  isAuthorized: false,
};

export default handleActions({}, initialState);
