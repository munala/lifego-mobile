import * as types from './actionTypes';
import likeService from '../api/likeApi';
import * as apiCallActions from './apiCallActions';

export const likeSuccess = (bucketlist, like) => ({
  type: types.LIKE,
  like,
  bucketlist,
  message: '',
});

export const unlikeSuccess = like => ({
  type: types.UNLIKE,
  message: '',
  like,
});

export const like = bucketlist => async (dispatch) => {
  const response = await likeService.like(bucketlist, like);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.resetError());
    dispatch(apiCallActions.apiCallError(response.error));
  } else {
    dispatch(likeSuccess(bucketlist, response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const unlike = likes => async (dispatch) => {
  const response = await likeService.unlike(likes);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(unlikeSuccess(likes));
    dispatch(apiCallActions.resetMessage());
  }
};
