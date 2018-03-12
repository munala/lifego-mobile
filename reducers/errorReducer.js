import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(
  state = initialState.error,
  action,
) {
  switch (action.type) {
    case types.API_CALL_ERROR:
      return action.error;

    case types.LOGOUT:
      return '';

    case types.RESET_ERROR:
      return '';

    default:
      return state;
  }
}
