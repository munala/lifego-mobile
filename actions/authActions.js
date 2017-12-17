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

export const login = user => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    const token = await UserService.loginUser(user);
    await AsyncStorage.setItem('token', token);
    dispatch({
      type: types.LOGIN_SUCCESS,
      token,
      loggedIn: true,
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const register = user => async (dispatch) => {
  dispatch({
    type: types.BEGIN_API_CALL,
  });
  try {
    await UserService.registerUser(user);
    dispatch(login(user));
    dispatch({
      type: types.API_CALL_ERROR,
      value: '',
    });
  } catch (error) {
    handleError(error, dispatch);
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
    await AsyncStorage.removeItem('token');
    dispatch({
      type: types.CHECK_TOKEN,
      loggedIn: false,
      token: null,
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
