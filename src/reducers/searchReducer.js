import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default(
  state = initialState.searchText,
  action,
) => {
  switch (action.type) {
    case types.SEARCH:
      return action.searchText;

    case types.CLEAR_SEARCH:
      return '';

    default:
      return state;
  }
};
