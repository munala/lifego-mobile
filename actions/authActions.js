import * as types from './actionTypes';
import UserService from '../api/authApi';
import * as apiCallActions from './apiCallActions';

export function loginSuccess(token) {
  return {
    type: types.LOGIN_SUCCESS,
    token,
  };
}

export function registerSuccess() {
  return {
    type: types.REGISTER_SUCCESS,
  };
}

export function isLoggedInSuccess(loggedIn) {
  return {
    type: types.LOGGED_IN_SUCCESS,
    loggedIn,
  };
}

export function login(user) {
  return function (dispatch) {
    dispatch(apiCallActions.beginApiCall());
    return UserService.loginUser(user).then((token) => {
      localStorage.setItem('token', token);
      dispatch(loginSuccess(token));
    }).catch((error) => {
      dispatch(apiCallActions.apiCallError());
      throw (error);
    });
  };
}

export function register(user) {
  return function (dispatch) {
    dispatch(apiCallActions.beginApiCall());
    return UserService.registerUser(user).then(() => {
      dispatch(registerSuccess());
    }).catch((error) => {
      dispatch(apiCallActions.apiCallError());
      throw (error);
    });
  };
}
