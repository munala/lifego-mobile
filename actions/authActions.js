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
  }, 1);
};

export function login(user) {
  return function (dispatch) {
    return UserService.loginUser(user).then((token) => {
      AsyncStorage.setItem('token', token);
      dispatch({
        type: types.LOGIN_SUCCESS,
        token,
        loggedIn: true,
      });
    }).catch((error) => {
      handleError(error, dispatch);
    });
  };
}

export function register(user) {
  return function (dispatch) {
    return UserService.registerUser(user).then(() => {
      dispatch(login(user));
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
      });
    }).catch((error) => {
      handleError(error, dispatch);
    });
  };
}

export function logout() {
  return function (dispatch) {
    return AsyncStorage.removeItem('token').then(() => {
      dispatch({
        type: types.CHECK_TOKEN,
        loggedIn: false,
      });
    }).catch((error) => {
      handleError(error, dispatch);
    });
  };
}
