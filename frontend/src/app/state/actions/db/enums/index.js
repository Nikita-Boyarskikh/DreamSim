import { createAction } from 'redux-actions';
import { LOAD_ENUMS } from 'app/constants/actionTypes';
import { loadTools } from './tools';

const loadEnums = () => async (dispatch, getState) => {
  const action = createAction(LOAD_ENUMS);
  dispatch(action());

  const state = getState();
  if (state.db.enums.tools.ids.length === 0) {
    await dispatch(loadTools());
  }
};

export default loadEnums;
