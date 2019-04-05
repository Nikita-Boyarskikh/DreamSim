import { handleActions } from 'redux-actions';

import { PAGE_TITLE_CHANGE } from 'app/constants/actionTypes';

const initialState = 'Dream Sim';

export default handleActions({
  [PAGE_TITLE_CHANGE](action) {
    return action.title;
  },
}, initialState);
