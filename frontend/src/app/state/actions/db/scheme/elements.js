import { createAction } from 'redux-actions';

import { ADD_SCHEME_ELEMENT } from 'constants/actionTypes';

export const addSchemeElement = (elementType, x, y) => (dispatch, getState) => {
  const action = createAction(ADD_SCHEME_ELEMENT);

  dispatch(action({elementType, x, y}));
};
