import * as types from './actionTypes';
import commentService from '../api/commentApi';
import * as apiCallActions from './apiCallActions';
import { resetError, timeout } from './bucketlistActions';

export const addCommentSuccess = (bucketlist, comment) => ({
  type: types.ADD_COMMENT,
  comment,
  bucketlist,
  message: '',
});

export const editCommentSuccess = ({ content }) => ({
  type: types.EDIT_COMMENT,
  content,
  message: '',
});

export const deleteCommentSuccess = () => ({
  type: types.DELETE_COMMENT,
  message: '',
});

export const addComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.addComment(bucketlist, comment);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(addCommentSuccess(bucketlist, response));
  }
};

export const updateComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.updateComment(bucketlist, comment);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(editCommentSuccess(bucketlist, response));
  }
};

export const deleteComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.deleteComment(bucketlist, comment);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(deleteCommentSuccess(bucketlist, comment));
  }
};
