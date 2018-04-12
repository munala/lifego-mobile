import * as types from './actionTypes';

export const beginApiCall = () => ({
  type: types.BEGIN_API_CALL,
});

export const apiCallError = error => ({
  type: types.API_CALL_ERROR,
  error,
});

export const resetMessage = () => ({
  type: types.RESET_MESSAGE,
});

export const resetError = () => ({
  type: types.RESET_ERROR,
});
