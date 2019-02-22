import { createAction } from 'redux-actions';

import { API, LOADING_START, LOADING_STOP } from 'app/constants/actionTypes';

export const apiError = (error) => (dispatch, getState) => {
  const action = createAction(API);

  dispatch(action({ error }));
};

export const apiCall = (method, success) => (dispatch, getState) => {
  const action = createAction(API);

  dispatch(action({ method, success }));
};

export const apiStart = () => (dispatch, getState) => {
  const action = createAction(LOADING_START);

  dispatch(action());
};

export const apiStop = () => (dispatch, getState) => {
  const action = createAction(LOADING_STOP);

  dispatch(action());
};
