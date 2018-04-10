import * as types from './actionTypes';
import messageService from '../api/messageApi';
import * as apiCallActions from './apiCallActions';
import { resetError, timeout } from './bucketlistActions';

export const sendMessageSuccess = message => ({
  type: types.SEND_MESSAGE,
  message,
});

export const startConversationSuccess = conversation => ({
  type: types.START_CONVERSATION,
  conversation,
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
  message: '',
  conversation,
});

export const getConversationsSuccess = ({ conversations }) => ({
  type: types.GET_CONVERSATIONS_SUCCESS,
  message: '',
  conversations,
});

export const sendMessage = message => async (dispatch) => {
  const response = await messageService.sendMessage(message);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(sendMessageSuccess(response));
  }
};

export const startConversation = conversation => async (dispatch) => {
  const response = await messageService.startConversation(conversation);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
    return null;
  }
  dispatch(startConversationSuccess(response));
  return response;
};

export const updateMessage = message => async (dispatch) => {
  const response = await messageService.updateMessage(message);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(editMessageSuccess(response));
  }
};

export const markAsRead = message => async (dispatch) => {
  const response = await messageService.markAsRead(message);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(editMessageSuccess(response));
  }
};

export const deleteMessage = message => async (dispatch) => {
  const response = await messageService.deleteMessage(message);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(deleteMessageSuccess(message));
  }
};

export const getConversations = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await messageService.getConversations();
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(getConversationsSuccess(response));
  }
};

export const deleteConversation = conversation => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await messageService.deleteConversation(conversation);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(deleteConversationSuccess({ ...response, conversation }));
  }
};
