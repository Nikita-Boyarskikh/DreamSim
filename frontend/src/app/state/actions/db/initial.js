import loadEnums from './enums';

export const initialize = () => dispatch => {
  dispatch(loadEnums());
};
