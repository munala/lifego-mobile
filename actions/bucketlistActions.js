import * as types from './actionTypes';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';
import configureStore from '../store/configureStore';

const store = configureStore();

export function getStore() {
  return store;
}

export function loadBucketlistsSuccess(data) {
  return {
    type: types.LOAD_BUCKETLISTS_SUCCESS,
    data,
  };
}

export function createBucketlistSuccess(bucketlist) {
  return {
    type: types.CREATE_BUCKETLIST_SUCCESS,
    bucketlist,
  };
}

export function updateBucketlistSuccess(bucketlist) {
  return {
    type: types.UPDATE_BUCKETLIST_SUCCESS,
    bucketlist,
  };
}

export function deleteBucketlistSuccess(bucketlist) {
  return {
    type: types.DELETE_BUCKETLIST_SUCCESS,
  };
}

export function createItemSuccess(bucketlist, item) {
  return {
    type: types.CREATE_ITEM_SUCCESS,
    bucketlist,
    item,
  };
}

export function updateItemSuccess(bucketlist, item) {
  return {
    type: types.UPDATE_ITEM_SUCCESS,
    bucketlist,
    item,
  };
}

export function deleteItemSuccess() {
  return {
    type: types.DELETE_ITEM_SUCCESS,
  };
}

export function loadBucketlists(offset, limit, search) {
  return BucketlistService.getAllBucketlists(
    offset, limit, search,
  ).then((response) => {
    store.dispatch({
      type: types.LOAD_BUCKETLISTS_SUCCESS,
      bucketlists: response.bucketlists,
    });
  }).catch((error) => {
    throw error.message;
  });
}

export function saveBucketlist(bucketlist) {
  return BucketlistService.saveBucketlist(
    bucketlist,
  ).then((savedBucketlist) => {
    store.dispatch({
      type: types.CREATE_BUCKETLIST_SUCCESS,
      bucketlist: savedBucketlist,
    });
  }).catch((error) => {
    throw error.message;
  });
}

export function updateBucketlist(bucketlist) {
  return BucketlistService.updateBucketlist(
    bucketlist,
  ).then((savedBucketlist) => {
    store.dispatch({
      type: types.UPDATE_BUCKETLIST_SUCCESS,
      bucketlist: savedBucketlist,
    });
  }).catch((error) => {
    throw error.message;
  });
}

export function deleteBucketlist(bucketlist) {
  return BucketlistService.deleteBucketlist(
    bucketlist,
  ).then(() => {
    store.dispatch({
      type: types.DELETE_BUCKETLIST_SUCCESS,
      bucketlist,
    });
  }).catch((error) => {
    throw error.message;
  });
}

export function saveItem(bucketlist, item) {
  return BucketlistService.addItem(bucketlist, item).then((savedItem) => {
    store.dispatch({
      type: types.CREATE_ITEM_SUCCESS,
      bucketlist,
      item: savedItem,
    });
  }).catch((error) => {
    throw error.message;
  });
}

export function updateItem(bucketlist, item) {
  return BucketlistService.updateItem(bucketlist, item).then((savedItem) => {
    store.dispatch({
      type: types.UPDATE_ITEM_SUCCESS,
      bucketlist,
      item: savedItem,
    });
  }).catch((error) => {
    throw error.message;
  });
}

export function deleteItem(bucketlist, item) {
  return BucketlistService.deleteItem(bucketlist, item).then(() => {
    store.dispatch({
      type: types.DELETE_ITEM_SUCCESS,
      bucketlist,
      item,
    });
  }).catch((error) => {
    throw error.message;
  });
}
