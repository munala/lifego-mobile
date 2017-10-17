import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import UserService from '../api/authApi';

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
      throw (error);
    });
  };
}

export function register(user) {
  return function (dispatch) {
    return UserService.registerUser(user).then(() => {
      dispatch(login(user));
    }).catch((error) => {
      throw (error);
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
      throw (error);
    });
  };
}
