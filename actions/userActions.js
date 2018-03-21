import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import userService from '../api/userApi';
import * as apiCallActions from './apiCallActions';
import { resetError, resetMessage, timeout } from './bucketlistActions';

export const loginSuccess = token => ({
  type: types.LOGIN_SUCCESS,
  token,
  message: 'Welcome',
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

export const addFollower = follower => ({
  type: types.ADD_FOLLOWER,
  follower,
});

export const removeFollower = follower => ({
  type: types.REMOVE_FOLLOWER,
  follower,
});

export const logoutUser = () => ({
  type: types.LOGOUT,
});

export const login = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const token = await userService.loginUser(user);
  if (token.error) {
    dispatch(apiCallActions.apiCallError(token.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('start', 'false');
    dispatch(loginSuccess(token));
    resetMessage(dispatch);
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.setItem('can_login', 'false');
  await AsyncStorage.removeItem('token');
  dispatch(logoutUser());
};

export const socialLogin = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const token = await userService.socialLogin(user);
  if (token.error) {
    dispatch(apiCallActions.apiCallError(token.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    AsyncStorage.setItem('token', token);
    dispatch(loginSuccess(token));
    resetMessage(dispatch);
  }
};

export const register = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.registerUser(user);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(registerSuccess());
    resetMessage(dispatch);
  }
};

export const changeEmail = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.changeEmail(user);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    AsyncStorage.setItem('token', response.token);
    dispatch(changeEmailSuccess(response.message));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const changePassword = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.changePassword(user);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    AsyncStorage.setItem('token', response.token);
    dispatch(changePasswordSuccess(response.message));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const changeUsername = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.changeUsername(user);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    AsyncStorage.setItem('token', response.token);
    dispatch(changeUsernameSuccess(response.message));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const resetPassword = email => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.resetPassword(email);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(resetPasswordSuccess(response.message));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.getProfile();
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(getProfileSuccess(response));
    resetMessage(dispatch);
  }
};

export const updateProfile = profile => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall());
  const response = await userService.updateProfile(profile);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(updateProfileSuccess(response));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const addFriend = user => async (dispatch) => {
  const response = await userService.addFriend(user);
  if (response.error) {
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(addFriendSuccess(response));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const removeFriend = user => async (dispatch) => {
  const response = await userService.removeFriend(user);
  if (response.error) {
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(removeFriendSuccess(response, user));
    await timeout(4000);
    resetMessage(dispatch);
  }
};

export const searchUsers = name => async (dispatch) => {
  const response = await userService.searchUsers(name);
  if (response.users) {
    dispatch(searchUsersSuccess(response));
  }
};
