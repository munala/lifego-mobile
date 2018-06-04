import * as types from './actionTypes';
import likeService from '../api/likeApi';

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

  if (!response.error) {
    dispatch(likeSuccess(bucketlist, response));
  }
};

export const unlike = likes => async (dispatch) => {
  const response = await likeService.unlike(likes);

  if (!response.error) {
    dispatch(unlikeSuccess(likes));
  }
};
