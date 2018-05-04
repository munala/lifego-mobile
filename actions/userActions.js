import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import userService from '../api/userApi';
import * as apiCallActions from './apiCallActions';
import { navigate } from './navigationActions';
import { persist } from '../main';

export const loginSuccess = ({ token, screen }) => ({
  type: types.LOGIN_SUCCESS,
  token,
  message: '',
  screen,
});

export const registerSuccess = ({ screen }) => ({
  type: types.REGISTER_SUCCESS,
  message: 'Successfully registered',
  screen,
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

export const resetPasswordSuccess = ({ message, screen }) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  message,
  screen,
});

export const getProfileSuccess = ({ profile, screen }) => ({
  type: types.GET_PROFILE_SUCCESS,
  profile,
  message: '',
  screen,
});

export const getOtherProfileSuccess = ({ profile, screen }) => ({
  type: types.GET_OTHER_PROFILE_SUCCESS,
  profile,
  message: '',
  screen,
});

export const searchUsersSuccess = ({ users }) => ({
  type: types.SEARCH_USERS,
  users,
});

export const updateProfileSuccess = ({ profile, screen }) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  profile,
  message: 'Success',
  screen,
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

export const deleteAccountSuccess = message => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
  message,
});

const stripHtml = text => text
  .replace('<b>', '')
  .replace('</b>', '')
  .replace('<br/>', ' ');

export const login = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));
  const token = await userService.loginUser(user);
  if (token.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'user', error: token.error }));
    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('start', 'false');
    await dispatch(loginSuccess({ token, screen: 'user' }));
    navigate({ route: 'home', navigator: 'AuthNavigator' })(dispatch);
    dispatch(apiCallActions.resetMessage());
  }
  return token;
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.setItem('can_login', 'false');
  await AsyncStorage.removeItem('token');
  await dispatch(logoutUser());
  await navigate({ route: 'user', navigator: 'AuthNavigator' })(dispatch);
  persist.purge();
};

export const socialLogin = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));
  const token = await userService.socialLogin(user);
  if (token.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'user', error: token.error }));
    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('start', 'false');
    await dispatch(loginSuccess({ token, screen: 'user' }));
    navigate({ route: 'home', navigator: 'AuthNavigator' })(dispatch);
    dispatch(apiCallActions.resetMessage());
  }
  return token;
};

export const register = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));
  const response = await userService.registerUser(user);
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'user', error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(registerSuccess({ screen: 'user' }));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
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
  return response;
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
  return response;
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
  return response;
};

export const resetPassword = email => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));
  const response = await userService.resetPassword(email);
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'user', error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(resetPasswordSuccess({ screen: 'user', message: stripHtml(response.message) }));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const getProfile = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));
  const response = await userService.getProfile();
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'profile', error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getProfileSuccess({ profile: response, screen: 'profile' }));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const getOtherProfile = id => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));
  const response = await userService.getOtherProfile(id);
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen: 'profile', error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getOtherProfileSuccess({ profile: response, screen: 'profile' }));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};

export const updateProfile = (profile, screen) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen }));
  const response = await userService.updateProfile(profile);
  if (response.error) {
    dispatch(apiCallActions.apiCallError({ screen, error: response.error }));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateProfileSuccess({ profile, screen }));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
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
  return response;
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
  return response;
};

export const searchUsers = name => async (dispatch) => {
  const response = await userService.searchUsers(name);
  if (response.users) {
    dispatch(searchUsersSuccess(response));
  }
};

export const deleteAccount = user => async (dispatch) => {
  const response = await userService.deleteAccount(user);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteAccountSuccess(response.message));
    dispatch(apiCallActions.resetMessage());
  }
  return response;
};
