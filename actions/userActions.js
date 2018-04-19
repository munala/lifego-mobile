import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import userService from '../api/userApi';
import * as apiCallActions from './apiCallActions';
import { persist } from '../main';

export const loginSuccess = token => ({
  type: types.LOGIN_SUCCESS,
  token,
  message: '',
});

export const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS,
  message: 'Successfully registered',
});

export const changeEmailSuccess = message => ({
  type: types.CHANGE_EMAIL_SUCCESS,
  message,
});

export const changePasswordSuccess = message => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  message,
});

export const changeUsernameSuccess = message => ({
  type: types.CHANGE_USERNAME_SUCCESS,
  message,
});

export const resetPasswordSuccess = message => ({
  type: types.RESET_PASSWORD_SUCCESS,
  message,
});

export const getProfileSuccess = profile => ({
  type: types.GET_PROFILE_SUCCESS,
  profile,
  message: '',
});

export const getOtherProfileSuccess = profile => ({
  type: types.GET_OTHER_PROFILE_SUCCESS,
  profile,
  message: '',
});

export const searchUsersSuccess = ({ users }) => ({
  type: types.SEARCH_USERS,
  users,
});

export const updateProfileSuccess = ({ profile, message }) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  profile,
  message,
});

export const addFriendSuccess = ({ message, friend }) => ({
  type: types.ADD_FRIEND,
  message,
  friend,
});

export const removeFriendSuccess = ({ message }, friend) => ({
  type: types.REMOVE_FRIEND,
  message,
  friend,
});

export const removeFollower = follower => ({
  type: types.REMOVE_FOLLOWER,
  message: '',
  follower,
});

export const addFollower = follower => ({
  type: types.ADD_FOLLOWER,
  message: '',
  follower,
});

export const logoutUser = () => ({
  type: types.LOGOUT,
});

const stripHtml = text => text
  .replace('<b>', '')
  .replace('</b>', '')
  .replace('<br/>', ' ');

const navigate = route => ({
  type: types.NAVIGATE,
  navigator: 'auth',
  route,
});

export const login = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const token = await userService.loginUser(user);
  if (token.error) {
    dispatch(apiCallActions.apiCallError(token.error));
    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('start', 'false');
    dispatch(loginSuccess(token));
    dispatch(navigate('home'));
    dispatch(apiCallActions.resetMessage());
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.setItem('can_login', 'false');
  await AsyncStorage.removeItem('token');
  persist.purge();
  dispatch(logoutUser());
  dispatch(navigate('user'));
};

export const socialLogin = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const token = await userService.socialLogin(user);
  if (token.error) {
    dispatch(apiCallActions.apiCallError(token.error));
    dispatch(apiCallActions.resetError());
  } else {
    AsyncStorage.setItem('token', token);
    dispatch(loginSuccess(token));
    dispatch(navigate('home'));
    dispatch(apiCallActions.resetMessage());
  }
};

export const register = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.registerUser(user);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(registerSuccess());
    dispatch(apiCallActions.resetMessage());
  }
};

export const changeEmail = user => async (dispatch) => {
  const response = await userService.changeEmail(user);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    AsyncStorage.setItem('token', response.token);
    dispatch(changeEmailSuccess(response.message));
    dispatch(apiCallActions.resetMessage());
  }
};

export const changePassword = user => async (dispatch) => {
  const response = await userService.changePassword(user);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    AsyncStorage.setItem('token', response.token);
    dispatch(changePasswordSuccess(response.message));
    dispatch(apiCallActions.resetMessage());
  }
};

export const changeUsername = user => async (dispatch) => {
  const response = await userService.changeUsername(user);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    AsyncStorage.setItem('token', response.token);
    dispatch(changeUsernameSuccess(response.message));
    dispatch(apiCallActions.resetMessage());
  }
};

export const resetPassword = email => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.resetPassword(email);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(resetPasswordSuccess(stripHtml(response.message)));
    dispatch(apiCallActions.resetMessage());
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.getProfile();
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getProfileSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const getOtherProfile = id => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.getOtherProfile(id);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getOtherProfileSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const updateProfile = profile => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.updateProfile(profile);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateProfileSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const addFriend = user => async (dispatch) => {
  const response = await userService.addFriend(user);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(addFriendSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const removeFriend = user => async (dispatch) => {
  const response = await userService.removeFriend(user);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(removeFriendSuccess(response, user));
    dispatch(apiCallActions.resetMessage());
  }
};

export const searchUsers = name => async (dispatch) => {
  const response = await userService.searchUsers(name);
  if (response.users) {
    dispatch(searchUsersSuccess(response));
  }
};
