import loadEnums from './enums';
import { getUser } from 'app/state/actions/db/user';
import { login } from 'app/state/actions/user/authorization';

export const initialize = () => async dispatch => {
  await dispatch(login());
  await Promise.all([
    dispatch(getUser()),
    dispatch(loadEnums()),
  ]);
};
