import * as types from './actionTypes';
import notificationService from '../api/notificationApi';
import * as apiCallActions from './apiCallActions';

export const getNotificationsSuccess = ({ notifications }) => ({
  type: types.GET_NOTIFICATIONS,
  notifications,
  message: '',
});

export const newNotification = ({ notification }) => ({
  type: types.NEW_NOTIFICATION,
  notification,
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
  const response = await notificationService.getNotifications({ source: 'notifications' });
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    dispatch(apiCallActions.resetError());
  } else {
    dispatch(getNotificationsSuccess(response));
    dispatch(apiCallActions.resetMessage());
  }
};

export const markNotificationAsRead = notification => async (dispatch) => {
  const response = await notificationService.markAsRead(notification);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
  } else {
    dispatch(markAsReadSuccess(response));
  }
};

export const deleteNotification = notification => async (dispatch) => {
  const response = await notificationService.deleteNotification(notification);
  dispatch(apiCallActions.beginApiCall());
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
  } else {
    dispatch(deleteNotificationSuccess(notification));
  }
};
