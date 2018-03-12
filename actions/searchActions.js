import * as types from './actionTypes';

export const searchSuccess = searchText => ({
  type: types.SEARCH,
  searchText,
});

export const clearSearchSuccess = () => ({
  type: types.CLEAR_SEARCH,
});

export const search = searchText => async (dispatch) => {
  dispatch(searchSuccess(searchText));
};

export const clearSearch = searchText => async (dispatch) => {
  dispatch(clearSearchSuccess(searchText));
};
