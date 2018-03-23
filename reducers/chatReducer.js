import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function conversationReducer(
  state = initialState.conversations,
  action,
) {
  switch (action.type) {
    case types.GET_CONVERSATIONS_SUCCESS:
      return [...action.conversations];

    case types.START_CONVERSATION:
      return [action.conversation, ...[...state]
        .filter(conversation => conversation.id !== action.conversation.id)];

    case types.DELETE_CONVERSATION_SUCCESS:
      return [...state].filter(conversation => conversation.id !== action.conversation.id);

    case types.SEND_MESSAGE:
      return state.map((conversation) => {
        if (conversation.id === action.message.conversationId) {
          return { ...conversation, messages: [action.message, ...conversation.messages] };
        }
        return { ...conversation };
      });

    case types.EDIT_MESSAGE:
      return [
        ...state.map(conversation => ({
          ...conversation,
          messages: [
            ...conversation.messages
              .map(message => (
                (message.id === action.message.id) ?
                  action.message :
                  message)),
          ],
        })),
      ];

    case types.DELETE_MESSAGE:
      return [
        ...state.map(conversation => ({
          ...conversation,
          messages: [...conversation.messages
            .filter(message => message.id !== action.message.id)],
        })),
      ];

    default:
      return state;
  }
}