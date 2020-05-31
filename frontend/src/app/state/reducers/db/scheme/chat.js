import { SET_CHAT, ADD_MESSAGE, READ_MESSAGE } from 'app/constants/actionTypes';
import { handleSetNormalizedData } from 'app/lib/api';
import { chatSchema } from 'app/lib/api/schema/chat';

export default handleSetNormalizedData(SET_CHAT, chatSchema, {
  [ADD_MESSAGE] (state, action) {
    const userId = action.payload.result;

    return {
      entities: {
        ...state.entities,
        [userId]: action.payload.entities.users[userId],
      },
      ids: [...state.ids, userId],
    };
  },

  [READ_MESSAGE]: (state, action) => state.entities.map(message => {
    if (message.id === action.payload.id) {
      return {
        ...message,
        read: true,
      };
    }

    return message;
  }),
});
