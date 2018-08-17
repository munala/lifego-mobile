import * as types from './actionTypes';
import BucketlistService from '../api/bucketlistApi';
import * as apiCallActions from './apiCallActions';

export const getBucketlistSuccess = ({ bucketlist, screen }) => ({
  type: types.GET_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const createBucketlistSuccess = ({ bucketlist, screen }) => ({
  type: types.CREATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const loadBucketlistsSuccess = ({ data, screen }) => ({
  type: types.LOAD_BUCKETLISTS_SUCCESS,
  data,
  message: '',
  screen,
});

export const loadAllBucketlistsSuccess = ({ data, screen }) => ({
  type: types.LOAD_ALL_BUCKETLISTS_SUCCESS,
  data,
  screen,
  message: '',
});

export const updateBucketlistSuccess = ({ bucketlist, screen }) => ({
  type: types.UPDATE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const deleteBucketlistSuccess = ({ bucketlist, screen }) => ({
  type: types.DELETE_BUCKETLIST_SUCCESS,
  bucketlist,
  message: '',
  screen,
});

export const createItemSuccess = ({ bucketlist, item }) => ({
  type: types.CREATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
});

export const updateItemSuccess = ({ bucketlist, item }) => ({
  type: types.UPDATE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
});

export const deleteItemSuccess = ({ bucketlist, item }) => ({
  type: types.DELETE_ITEM_SUCCESS,
  bucketlist,
  item,
  message: '',
  screen: 'myBucketlists',
});

export const resetMessage = dispatch => dispatch({
  type: types.RESET_MESSAGE,
});

export const searchSuccess = ({ data: { bucketlists } }) => ({
  type: types.SEARCH_BUCKETLISTS,
  bucketlists,
});

export const resetError = dispatch =>
  dispatch({
    type: types.RESET_ERROR,
  });

export const addNewBucketlist = ({ bucketlist }) => ({
  type: types.ADD_NEW_BUCKETLIST,
  bucketlist,
});

export const loadMore = () => dispatch => dispatch({
  type: types.LOAD_OTHER_MORE_BUCKETLISTS,
});

const load = async ({
  id,
  offset,
  limit,
  search,
  dispatch,
  screen,
  serviceCall,
  action,
  mutation,
}) => {
  dispatch(apiCallActions.beginApiCall({ screen }));

  const response = await serviceCall(
    offset,
    limit,
    search,
    id,
  );

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen,
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    const actionCreator = action || loadBucketlistsSuccess;

    dispatch(actionCreator({
      data: response.data[mutation],
      screen,
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const loadMoreBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  const serviceCall = BucketlistService.getBucketlists;

  const action = loadMore;

  return load({
    offset,
    limit,
    search,
    dispatch,
    serviceCall,
    action,
    screen: 'loader',
    mutation: 'list',
  });
};

export const loadMoreAllBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async (dispatch) => {
  const serviceCall = BucketlistService.getAllBucketlists;

  const action = loadMore;

  return load({
    offset,
    limit,
    search,
    dispatch,
    serviceCall,
    action,
    screen: 'loader',
    mutation: 'listAll',
  });
};

export const loadBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  offset,
  limit,
  search,
  dispatch,
  serviceCall: BucketlistService.getBucketlists,
  screen: 'myBucketlists',
  mutation: 'list',
});

export const loadAllBucketlists = (
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  offset,
  limit,
  search,
  dispatch,
  action: loadAllBucketlistsSuccess,
  serviceCall: BucketlistService.getAllBucketlists,
  screen: 'allBucketlists',
  mutation: 'listAll',
});

export const loadOtherBucketlists = (
  id,
  offset = 0,
  limit = 50,
  search = '',
) => async dispatch => load({
  id,
  offset,
  limit,
  search,
  dispatch,
  serviceCall: BucketlistService.getOtherBucketlists,
  screen: 'myBucketlists',
  mutation: 'listOther',
});

export const clearSearch = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_SEARCH_RESULTS });
};

export const searchBucketlists = (offset = 0, limit = 100, search = '') => async (dispatch) => {
  if (search) {
    const response = await BucketlistService.getAllBucketlists(offset, limit, search);

    dispatch(searchSuccess({ data: response.data.listAll }));

    return;
  }

  clearSearch()(dispatch);
};

export const saveBucketlist = ({ id, ...bucketlist }) => async (dispatch) => {
  const response = await BucketlistService.saveBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ ...response, screen: 'myBucketlists' }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createBucketlistSuccess({
      bucketlist: response.data.createBucketlist,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.updateBucketlist(bucketlist);
  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({ error: response.error, screen: 'myBucketlists' }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateBucketlistSuccess({
      bucketlist: response.data.updateBucketlist,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteBucketlist = bucketlist => async (dispatch) => {
  const response = await BucketlistService.deleteBucketlist(bucketlist);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError(...response, 'myBucketlists'));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteBucketlistSuccess({
      bucketlist,
      ...response.data.deleteBucketlist,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const saveItem = (bucketlist, { id, pictureUrl, ...item }) => async (dispatch) => {
  const response = await BucketlistService.addItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(createItemSuccess({
      bucketlist,
      item: response.data.createItem,
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateItem = (bucketlist, { pictureUrl, ...item }) => async (dispatch) => {
  const response = await BucketlistService.updateItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateItemSuccess({
      bucketlist,
      item: { item, ...response.data.updateItem },
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteItem = (bucketlist, item) => async (dispatch) => {
  const response = await BucketlistService.deleteItem(bucketlist, item);

  dispatch(apiCallActions.beginApiCall({ screen: 'myBucketlists' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'myBucketlists',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteItemSuccess({
      bucketlist,
      item,
      ...response.data,
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};
