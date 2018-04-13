import * as types from './actionTypes';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const loadBucketlistsSuccess = data => ({
  type: types.LOAD_BUCKETLISTS_SUCCESS,
  data,
  message: '',
});

export const loadAllBucketlistsSuccess = data => ({
  type: types.LOAD_ALL_BUCKETLISTS_SUCCESS,
  data,
  message: '',
});

export const createBucketlistSuccess = bucketlist => ({
  type: types.CREATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
});

export const updateBucketlistSuccess = bucketlist => ({
  type: types.UPDATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
});

export const deleteBucketlistSuccess = ({ bucketlist }) => ({
  type: types.DELETE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
});

export const createItemSuccess = (bucketlist, item) => ({
  type: types.CREATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
});

export const updateItemSuccess = ({ bucketlist, item }) => ({
  type: types.UPDATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: 'Success',
});

export const deleteItemSuccess = ({ bucketlist, item }) => ({
  type: types.DELETE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: 'Success',
});

export const resetMessage = dispatch => dispatch({
  type: types.RESET_MESSAGE,
});

export const resetError = dispatch => dispatch({
  type: types.RESET_ERROR,
});

export const addNewBucketlist = bucketlist => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist,
});

export const loadMore = data => ({
  type: types.LOAD_MORE_BUCKETLISTS,
  data,
});

export const loadMoreAll = data => ({
  type: types.LOAD_MORE_ALL_BUCKETLISTS,
  data,
});

export const loadMoreBucketlists = (type, offset = 0, limit = 10, search = '') => async (dispatch) => {
  const action = type === 'all' ? BucketlistService.getAllBucketlists : BucketlistService.getBucketlists;
  const actionCreator = type === 'all' ? loadMoreAll : loadMore;
  const response = await action(offset, limit, search);
  if (!response.error) {
    dispatch(actionCreator(response));
  }
};

export const loadBucketlists = (offset = 0, limit = 10, search = '') => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.getBucketlists(offset, limit, search);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(loadBucketlistsSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const loadAllBucketlists = (offset = 0, limit = 10, search = '') => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.getAllBucketlists(offset, limit, search);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(loadAllBucketlistsSuccess(response));
  }
  dispatch(apiCallActions.resetMessage());
};

export const saveBucketlist = bucketlist => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.saveBucketlist(bucketlist);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createBucketlistSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const updateBucketlist = bucketlist => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.updateBucketlist(bucketlist);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateBucketlistSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const deleteBucketlist = bucketlist => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.deleteBucketlist(bucketlist);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteBucketlistSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const saveItem = (bucketlist, item) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.addItem(bucketlist, item);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createItemSuccess(bucketlist, response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const updateItem = (bucketlist, item) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.updateItem(bucketlist, item);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateItemSuccess({ bucketlist, item, ...response }));
    dispatch(apiCallActions.resetMessage());
  }
};

export const deleteItem = (bucketlist, item) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await BucketlistService.deleteItem(bucketlist, item);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteItemSuccess({ bucketlist, item, ...response }));
    dispatch(apiCallActions.resetMessage());
  }
};
