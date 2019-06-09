import { handleActions } from 'redux-actions';

import { PAGE_TITLE_CHANGE } from 'app/constants/actionTypes';
import { APP_NAME } from 'app/constants/view';

export default handleActions({
  [PAGE_TITLE_CHANGE](action) {
    return action.title;
  },
}, APP_NAME);
