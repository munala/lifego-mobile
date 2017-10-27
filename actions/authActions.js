import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import UserService from '../api/authApi';

const handleError = (error, dispatch) => {
  dispatch({
    type: types.SHOW_ERROR,
    value: error,
  });
  setTimeout(() => {
    dispatch({
      type: types.SHOW_ERROR,
      value: '',
    });
    dispatch({
      type: types.API_CALL_ERROR,
      value: '',
    });
  }, 1);
};

export function login(user) {
  return function (dispatch) {
    dispatch({
      type: types.BEGIN_API_CALL,
    });
    return UserService.loginUser(user).then((token) => {
      AsyncStorage.setItem('token', token).then(() => {
        dispatch({
          type: types.LOGIN_SUCCESS,
          token,
          loggedIn: true,
        });
      });
    }).catch((error) => {
      handleError(error, dispatch);
    });
  };
}

export function register(user) {
  return function (dispatch) {
    dispatch({
      type: types.BEGIN_API_CALL,
    });
    return UserService.registerUser(user).then(() => {
      dispatch(login(user));
      dispatch({
        type: types.API_CALL_ERROR,
        value: '',
      });
    }).catch((error) => {
      handleError(error, dispatch);
    });
  };
}

export function checkToken() {
  return function (dispatch) {
    return AsyncStorage.getItem('token').then((token) => {
      dispatch({
        type: types.CHECK_TOKEN,
        loggedIn: !!token,
        token,
      });
    }).catch((error) => {
      dispatch({
        type: types.SHOW_ERROR,
        value: error,
      });
    });
  };
}

export function logout() {
  return function (dispatch) {
    return AsyncStorage.removeItem('token').then(() => {
      dispatch({
        type: types.CHECK_TOKEN,
        loggedIn: false,
        token: '',
      });
    }).catch((error) => {
      handleError(error, dispatch);
    });
  };
}
