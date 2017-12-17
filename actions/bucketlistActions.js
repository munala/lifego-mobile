import * as types from './actionTypes';
import BucketlistService from '../api/bucketlistApi';

const handleError = (dispatch, error) => {
  dispatch({
    type: types.API_CALL_ERROR,
    value: '',
  });
  if (error.message && error.message === 'Unauthorised') {
    dispatch({
      type: types.CHECK_TOKEN,
      loggedIn: false,
    });
  } else {
    dispatch({
      type: types.SHOW_ERROR,
      value: error.message,
    });
    setTimeout(() => {
      dispatch({
        type: types.SHOW_ERROR,
        value: '',
      });
    }, 1);
  }
};

export const loadBucketlists = (offset, limit, search) => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    const response = await BucketlistService.getAllBucketlists(
      offset, limit, search,
    );
    dispatch({
      type: types.LOAD_BUCKETLISTS_SUCCESS,
      bucketlists: response.bucketlists,
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const saveBucketlist = bucketlist => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    const savedBucketlist = await BucketlistService.saveBucketlist(
      bucketlist,
    );
    dispatch({
      type: types.CREATE_BUCKETLIST_SUCCESS,
      bucketlist: savedBucketlist,
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const updateBucketlist = bucketlist => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    const savedBucketlist = await BucketlistService.updateBucketlist(
      bucketlist,
    );
    dispatch({
      type: types.UPDATE_BUCKETLIST_SUCCESS,
      bucketlist: { ...savedBucketlist, items: bucketlist.items },
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const deleteBucketlist = bucketlist => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    await BucketlistService.deleteBucketlist(
      bucketlist,
    );
    dispatch({
      type: types.DELETE_BUCKETLIST_SUCCESS,
      bucketlist,
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const saveItem = (bucketlist, item) => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    const savedItem = await BucketlistService.addItem(bucketlist, item);
    dispatch({
      type: types.CREATE_ITEM_SUCCESS,
      bucketlist,
      item: savedItem,
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const updateItem = (bucketlist, item) => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    const savedItem = await BucketlistService.updateItem(bucketlist, item);
    dispatch({
      type: types.UPDATE_ITEM_SUCCESS,
      bucketlist,
      item: savedItem,
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const deleteItem = (bucketlist, item) => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    await BucketlistService.deleteItem(bucketlist, item);
    dispatch({
      type: types.DELETE_ITEM_SUCCESS,
      bucketlist,
      item,
    });
  } catch (error) {
    handleError(dispatch, error);
  }
};
