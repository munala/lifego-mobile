import * as types from './actionTypes';
import notificationService from '../api/notificationApi';
import * as apiCallActions from './apiCallActions';
import { resetError, timeout } from './bucketlistActions';

export const getNotificationsSuccess = ({ notifications }) => ({
  type: types.GET_NOTIFICATIONS,
  notifications,
});

export const newNotification = ({ notification }) => ({
  type: types.NEW_NOTIFICATION,
  notification,
});

export const markAsReadSuccess = notification => ({
  type: types.EDIT_NOTIFICATION,
  notification,
});

export const deleteNotificationSuccess = notification => ({
  type: types.DELETE_NOTIFICATION,
  notification,
});

export const getNotifications = () => async (dispatch) => {
  const response = await notificationService.getNotifications();
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(getNotificationsSuccess(response));
  }
};

export const markNotificationAsRead = notification => async (dispatch) => {
  const response = await notificationService.markAsRead(notification);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(markAsReadSuccess(response));
  }
};

export const deleteNotification = notification => async (dispatch) => {
  const response = await notificationService.deleteNotification(notification);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(deleteNotificationSuccess(notification));
  }
};
