import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import UserService from '../api/authApi';

const handleError = async (error, dispatch) => {
  await dispatch({
    type: types.SHOW_ERROR,
    value: error,
  });
  dispatch({
    type: types.SHOW_ERROR,
    value: '',
  });
  dispatch({
    type: types.API_CALL_ERROR,
  });
};

export const login = user => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  const token = await UserService.loginUser(user);
  if (token.error) {
    handleError(token.error, dispatch);
  } else {
    await AsyncStorage.setItem('token', token);
    dispatch({
      type: types.LOGIN_SUCCESS,
      token,
      loggedIn: true,
    });
  }
};

export const register = user => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  const response = await UserService.registerUser(user);
  if (response.error) {
    handleError(response.error, dispatch);
  } else {
    dispatch(login(user));
    dispatch({
      type: types.API_CALL_ERROR,
      value: '',
    });
  }
};

export const checkToken = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: types.CHECK_TOKEN,
      loggedIn: !!token,
      token,
    });
  } catch (error) {
    dispatch({
      type: types.SHOW_ERROR,
      value: error,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    AsyncStorage.setItem('can_login', 'false');
    dispatch({
      type: types.CHECK_TOKEN,
      loggedIn: false,
      token: null,
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
