import loadEnums from './enums';
import { getUser } from 'app/state/actions/db/user';
import { login } from 'app/state/actions/user/authorization';

export const initialize = () => dispatch => {
  dispatch(login());
  dispatch(getUser());
  dispatch(loadEnums());
};
