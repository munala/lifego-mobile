import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authtReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        token: action.token,
      };

    default:
      return state;
  }
}
