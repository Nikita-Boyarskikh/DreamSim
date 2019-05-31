import { REHYDRATE } from 'redux-persist/es/constants';
import { initialize } from 'app/state/actions/db/initial';

export default ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case REHYDRATE:
      const result = next(action);
      dispatch(initialize());
      return result;
    default:
      return next(action);
  }
};
