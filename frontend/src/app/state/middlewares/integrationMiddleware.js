import { REHYDRATE } from 'redux-persist';
import { initialize } from 'app/state/actions/db/initial';
import { alert } from 'app/state/actions/ui';
import { LOCATION_CHANGE, push as goUrl } from 'connected-react-router';

import urls from 'app/constants/urls';
import { __ } from 'app/lib/i18n';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS } from 'app/constants/actionTypes';

export default ({ dispatch, getState }) => next => action => {
  const state = getState();
  let result = null;

  switch (action.type) {
    case REHYDRATE:
      result = next(action);
      dispatch(initialize());
      return result;
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGOUT_SUCCESS:
      result = next(action);
      dispatch(goUrl(urls.root));
      return result;
    case LOCATION_CHANGE:
      if (action.payload.location.pathname === urls.profile && !state.local.user.authKey) {
        action.payload.location.pathname = urls.login;
        dispatch(alert(__('Authorize to view your profile')));
      }
      return next(action);
    default:
      return next(action);
  }
};
