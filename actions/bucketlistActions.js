import * as types from './actionTypes';
import BucketlistService from '../api/bucketlistApi';

export function loadBucketlists(offset, limit, search) {
  return function (dispatch) {
    return BucketlistService.getAllBucketlists(
      offset, limit, search,
    ).then((response) => {
      dispatch({
        type: types.LOAD_BUCKETLISTS_SUCCESS,
        bucketlists: response.bucketlists,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}

export function saveBucketlist(bucketlist) {
  return function (dispatch) {
    return BucketlistService.saveBucketlist(
      bucketlist,
    ).then((savedBucketlist) => {
      dispatch({
        type: types.CREATE_BUCKETLIST_SUCCESS,
        bucketlist: savedBucketlist,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}

export function updateBucketlist(bucketlist) {
  return function (dispatch) {
    return BucketlistService.updateBucketlist(
      bucketlist,
    ).then((savedBucketlist) => {
      dispatch({
        type: types.UPDATE_BUCKETLIST_SUCCESS,
        bucketlist: savedBucketlist,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}

export function deleteBucketlist(bucketlist) {
  return function (dispatch) {
    return BucketlistService.deleteBucketlist(
      bucketlist,
    ).then(() => {
      dispatch({
        type: types.DELETE_BUCKETLIST_SUCCESS,
        bucketlist,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}

export function saveItem(bucketlist, item) {
  return function (dispatch) {
    return BucketlistService.addItem(bucketlist, item).then((savedItem) => {
      dispatch({
        type: types.CREATE_ITEM_SUCCESS,
        bucketlist,
        item: savedItem,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}

export function updateItem(bucketlist, item) {
  return function (dispatch) {
    return BucketlistService.updateItem(bucketlist, item).then((savedItem) => {
      dispatch({
        type: types.UPDATE_ITEM_SUCCESS,
        bucketlist,
        item: savedItem,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}

export function deleteItem(bucketlist, item) {
  return function (dispatch) {
    return BucketlistService.deleteItem(bucketlist, item).then(() => {
      dispatch({
        type: types.DELETE_ITEM_SUCCESS,
        bucketlist,
        item,
      });
    }).catch((error) => {
      throw error.message;
    });
  };
}
