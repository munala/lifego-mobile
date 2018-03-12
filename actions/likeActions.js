import * as types from './actionTypes';
import likeService from '../api/likeApi';
import * as apiCallActions from './apiCallActions';
import { resetError, timeout } from './bucketlistActions';

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
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(likeSuccess(bucketlist, response));
  }
};

export const unlike = likes => async (dispatch) => {
  const response = await likeService.unlike(likes);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(unlikeSuccess(likes));
  }
};
