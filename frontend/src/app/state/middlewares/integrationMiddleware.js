import { REHYDRATE } from 'redux-persist/es/constants';
import { initialize } from 'app/state/actions/db/initial';
import { alert } from 'app/state/actions/ui';
import { LOCATION_CHANGE } from 'connected-react-router';

import urls from 'app/constants/urls';
import { __ } from 'app/lib/i18n';

export default ({ dispatch, getState }) => next => action => {
  const state = getState();

  switch (action.type) {
    case REHYDRATE:
      const result = next(action);
      dispatch(initialize());
      return result;
    case LOCATION_CHANGE:
      if (action.payload.location.pathname === urls.profile && !state.local.user.isAuthorized) {
        action.payload.location.pathname = urls.login;
        dispatch(alert(__('Authorize to view your profile')));
      }
      return next(action);
    default:
      return next(action);
  }
};
