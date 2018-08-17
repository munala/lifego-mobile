import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import userService from '../api/userApi';
import { navigate } from './navigationActions';
import { persist } from '..';
import * as apiCallActions from './apiCallActions';
import { stripHtml } from '../utils';

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

export const resetPasswordSuccess = ({ message, screen }) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  message,
  screen,
});

export const logoutUser = () => ({
  type: types.LOGOUT,
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
  screen: 'others',
});

export const removeFriendSuccess = ({ message, friend }) => ({
  type: types.REMOVE_FRIEND,
  message,
  friend,
  screen: 'others',
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

export const changeEmailSuccess = (message, screen) => ({
  type: types.CHANGE_EMAIL_SUCCESS,
  message,
  screen,
});

export const changePasswordSuccess = (message, screen) => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  message,
  screen,
});

export const changeUsernameSuccess = (message, screen) => ({
  type: types.CHANGE_USERNAME_SUCCESS,
  message,
  screen,
});

export const deleteAccountSuccess = (message, screen) => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
  message,
  screen,
});

export const searchUsersSuccess = ({ users }) => ({
  type: types.SEARCH_USERS,
  users,
});

const loginUser = (user, serviceCall) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));

  const response = await serviceCall(user);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'user',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', response.token);
    await AsyncStorage.setItem('start', 'false');

    await dispatch(loginSuccess({
      ...response,
      screen: 'user',
    }));

    navigate({
      route: 'home',
      navigator: 'AuthNavigator',
    })(dispatch);

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const login = user => loginUser(user, userService.loginUser);

export const socialLogin = user => loginUser(user, userService.socialLogin);

export const logout = () => async (dispatch) => {
  await AsyncStorage.setItem('can_login', 'false');
  await AsyncStorage.removeItem('token');

  await dispatch(logoutUser());

  await navigate({
    route: 'user',
    navigator: 'AuthNavigator',
  })(dispatch);

  persist.purge();
};

export const register = user => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));

  const response = await userService.registerUser(user);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'user',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(registerSuccess({ screen: 'user' }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const resetPassword = email => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'user' }));

  const response = await userService.resetPassword(email);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'user',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(resetPasswordSuccess({
      screen: 'user',
      message: stripHtml(response.message),
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};


export const getProfile = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));

  const response = await userService.getProfile();

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'profile',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getProfileSuccess({
      profile: response.data.getProfile,
      screen: 'profile',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const getOtherProfile = id => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'profile' }));

  const response = await userService.getOtherProfile(id);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'profile',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getOtherProfileSuccess({
      profile: response.data.getOtherProfile,
      screen: 'profile',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const updateProfile = (profile, screen) => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen }));

  const response = await userService.updateProfile(profile);

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen,
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(updateProfileSuccess({ profile: response.data.updateProfile, screen }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const addFriend = user => async (dispatch) => {
  const response = await userService.addFriend(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(addFriendSuccess({ ...response.data.addFriend, friend: user }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const removeFriend = user => async (dispatch) => {
  const response = await userService.removeFriend(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(removeFriendSuccess({ ...response.data.removeFriend, friend: user }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};


export const changeEmail = user => async (dispatch) => {
  const response = await userService.changeEmail(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'settings',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', response.token);

    dispatch(changeEmailSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const changePassword = user => async (dispatch) => {
  const response = await userService.changePassword(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'settings',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', response.token);

    dispatch(changePasswordSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const changeUsername = user => async (dispatch) => {
  const response = await userService.changeUsername(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'settings',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    await AsyncStorage.setItem('token', response.token);

    dispatch(changeUsernameSuccess(response.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const deleteAccount = user => async (dispatch) => {
  const response = await userService.deleteAccount(user);

  dispatch(apiCallActions.beginApiCall({ screen: 'settings' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'settings',
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(deleteAccountSuccess(response.data.deleteAccount.message, 'settings'));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const searchUsers = name => async (dispatch) => {
  const {
    data: { searchUsers: users },
  } = await userService.searchUsers(name);

  if (users) {
    dispatch(searchUsersSuccess({ users }));
  }

  return ({ users });
};
