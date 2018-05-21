import * as types from './actionTypes';
import tagService from '../api/tagApi';
import * as apiCallActions from './apiCallActions';

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

export const addTag = (name, screen) => async (dispatch) => {
  const response = await tagService.addTag(name);
  dispatch(apiCallActions.beginApiCall({ screen }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(addTagSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const getTags = screen => async (dispatch) => {
  const response = await tagService.getTags();
  dispatch(apiCallActions.beginApiCall({ screen }));
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getTagsSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};
