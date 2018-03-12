import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.loggedIn, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return true;

    case types.LOGOUT:
      return false;

    case types.REGISTER_SUCCESS:
      return state;

    default:
      return state;
  }
}
