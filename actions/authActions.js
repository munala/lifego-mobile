import * as types from './actionTypes';
import UserService from '../api/authApi';

export function login(user) {
  return function (dispatch) {
    return UserService.loginUser(user).then((token) => {
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
  console.log('2', { user });
  return function (dispatch) {
    return UserService.registerUser(user).then(() => {
      console.log('3', { user });
      dispatch(login(user));
    }).catch((error) => {
      throw (error);
    });
  };
}
