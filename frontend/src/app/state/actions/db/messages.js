import { createAction } from 'redux-actions';

import urls from 'app/constants/urls';
import { ADD_MESSAGE, LOAD_CHAT, READ_MESSAGE, SET_CHAT } from 'app/constants/actionTypes';
import { chatSchema } from 'app/lib/api/schema/chat';
import { createApiAction } from 'app/lib/api';

export const fetchChat = createApiAction({
  endpoint: urls.api.v1.scheme.chat,
  success: SET_CHAT,
  schema: [chatSchema],
});

export const addMessage = createApiAction({
  endpoint: urls.api.v1.scheme.chat,
  method: 'POST',
  success: ADD_MESSAGE,
  schema: chatSchema,
});

export const readMessage = createApiAction({
  endpoint: urls.api.v1.scheme.chat.read,
  method: 'POST',
  success: READ_MESSAGE,
});

export const loadChat = () => async dispatch => {
  const action = createAction(LOAD_CHAT);

  dispatch(action());
  await dispatch(fetchChat());
};
