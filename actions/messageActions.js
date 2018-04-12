import * as types from './actionTypes';
import messageService from '../api/messageApi';
import * as apiCallActions from './apiCallActions';

export const sendMessageSuccess = message => ({
  type: types.SEND_MESSAGE,
  message,
});

export const startConversationSuccess = conversation => ({
  type: types.START_CONVERSATION,
  conversation,
  message: '',
});

export const editMessageSuccess = message => ({
  type: types.EDIT_MESSAGE,
  message,
});

export const deleteMessageSuccess = message => ({
  type: types.DELETE_MESSAGE,
  message,
});

export const deleteConversationSuccess = ({ message, conversation }) => ({
  type: types.DELETE_CONVERSATION_SUCCESS,
  message,
  conversation,
});

export const getConversationsSuccess = ({ conversations }) => ({
  type: types.GET_CONVERSATIONS_SUCCESS,
  message: '',
  conversations,
});

export const sendMessage = message => async (dispatch) => {
  const response = await messageService.sendMessage(message);
  if (!response.error) {
    dispatch(sendMessageSuccess(response));
  }
};

export const startConversation = conversation => async (dispatch) => {
  const response = await messageService.startConversation(conversation);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
    return null;
  }
  dispatch(startConversationSuccess(response));
  dispatch(apiCallActions.resetMessage());
  return response;
};

export const updateMessage = message => async (dispatch) => {
  const response = await messageService.updateMessage(message);
  if (!response.error) {
    dispatch(editMessageSuccess(response));
  }
};

export const markAsRead = message => async (dispatch) => {
  const response = await messageService.markAsRead(message);
  if (!response.error) {
    dispatch(editMessageSuccess(response));
  }
};

export const deleteMessage = message => async (dispatch) => {
  const response = await messageService.deleteMessage(message);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteMessageSuccess(message));
    dispatch(apiCallActions.resetMessage());
  }
};

export const getConversations = () => async (dispatch) => {
  const response = await messageService.getConversations();
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getConversationsSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const deleteConversation = conversation => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await messageService.deleteConversation(conversation);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteConversationSuccess({ ...response, conversation }));
    dispatch(apiCallActions.resetMessage());
  }
};
