import * as types from './actionTypes';
import notificationService from '../api/notificationApi';
import * as apiCallActions from './apiCallActions';

export const getNotificationsSuccess = ({ notifications, screen }) => ({
  type: types.GET_NOTIFICATIONS,
  notifications,
  message: '',
  screen,
});

export const newNotification = ({ read, ...notification }) => ({
  type: types.NEW_NOTIFICATION,
  notification: {
    ...notification,
    read: typeof notification === 'boolean' ? read : read === 'true',
  },
  message: '',
});

export const markAsReadSuccess = notification => ({
  type: types.EDIT_NOTIFICATION,
  notification,
  message: '',
});

export const deleteNotificationSuccess = notification => ({
  type: types.DELETE_NOTIFICATION,
  notification,
  message: '',
});

export const getNotifications = () => async (dispatch) => {
  dispatch(apiCallActions.beginApiCall({ screen: 'notifications' }));

  const response = await notificationService.getNotifications();

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      screen: 'notifications',
      error: response.error,
    }));

    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getNotificationsSuccess({
      notifications: response.data.getNotifications,
      screen: 'notifications',
    }));

    dispatch(apiCallActions.resetMessage());
  }

  return response;
};

export const markNotificationAsRead = notification => async (dispatch) => {
  const response = await notificationService.markAsRead(notification);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));
  } else {
    dispatch(markAsReadSuccess({
      ...notification,
      read: true,
    }));
  }

  return response;
};

export const deleteNotification = notification => async (dispatch) => {
  const response = await notificationService.deleteNotification(notification);

  dispatch(apiCallActions.beginApiCall({ screen: 'others' }));

  if (response.error) {
    dispatch(apiCallActions.apiCallError({
      ...response,
      screen: 'others',
    }));
  } else {
    dispatch(deleteNotificationSuccess(notification));
  }

  return response;
};
