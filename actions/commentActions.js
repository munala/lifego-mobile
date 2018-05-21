import * as types from './actionTypes';
import commentService from '../api/commentApi';
import * as apiCallActions from './apiCallActions';

export const addCommentSuccess = (bucketlist, comment) => ({
  type: types.ADD_COMMENT,
  comment,
  bucketlist,
  message: '',
});

export const editCommentSuccess = (bucketlist, comment) => ({
  type: types.EDIT_COMMENT,
  comment,
  bucketlist,
  message: '',
});

export const deleteCommentSuccess = (bucketlist, comment) => ({
  type: types.DELETE_COMMENT,
  bucketlist,
  comment,
  message: '',
});

export const addComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.addComment(bucketlist, comment);
  dispatch(apiCallActions.beginApiCall({ screen: 'allBucketlists' }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'allBucketlists' }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(addCommentSuccess(bucketlist, response));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const updateComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.updateComment(comment);
  dispatch(apiCallActions.beginApiCall({ screen: 'allBucketlists' }));
  if (response.error) {
    dispatch(apiCallActions.resetError());
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'allBucketlists' }));
  } else {
    dispatch(editCommentSuccess(bucketlist, response));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const deleteComment = (bucketlist, comment) => async (dispatch) => {
  const response = await commentService.deleteComment(comment);
  dispatch(apiCallActions.beginApiCall({ screen: 'allBucketlists' }));
  if (response.error) {
    dispatch(apiCallActions.resetError());
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'allBucketlists' }));
  } else {
    dispatch(deleteCommentSuccess(bucketlist, comment));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};
