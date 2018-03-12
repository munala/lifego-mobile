import * as types from './actionTypes';
import tagService from '../api/tagApi';
import * as apiCallActions from './apiCallActions';
import { resetError, timeout } from './bucketlistActions';

export const getTagsSuccess = ({ tags }) => ({
  type: types.GET_TAGS,
  tags,
  message: '',
});

export const addTagSuccess = tag => ({
  type: types.ADD_TAG,
  message: '',
  tag,
});

export const addTag = name => async (dispatch) => {
  const response = await tagService.addTag(name);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(addTagSuccess(response));
  }
};

export const getTags = () => async (dispatch) => {
  const response = await tagService.getTags();
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(getTagsSuccess(response));
  }
};
