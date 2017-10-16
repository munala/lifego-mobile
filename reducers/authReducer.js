import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authtReducer(state=initialState.loggedIn, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.token;

    case types.REGISTER_SUCCESS:
      return state;

    default:
      return state;
  }
}
