import * as types from './actionTypes';
import alertService from '../api/userAlertApi';
import * as apiCallActions from './apiCallActions';
import { resetError, timeout } from './bucketlistActions';

export const getAlertsSuccess = ({ alerts }) => ({
  type: types.GET_ALERTS,
  alerts,
});

export const newAlert = ({ alert }) => ({
  type: types.NEW_ALERT,
  alert,
});

export const markAsReadSuccess = alert => ({
  type: types.EDIT_ALERT,
  alert,
});

export const deleteAlertSuccess = alert => ({
  type: types.DELETE_ALERT,
  alert,
});

export const getAlerts = () => async (dispatch) => {
  const response = await alertService.getAlerts();
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(getAlertsSuccess(response));
  }
};

export const markAlertAsRead = alert => async (dispatch) => {
  const response = await alertService.markAsRead(alert);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(markAsReadSuccess(response));
  }
};

export const deleteAlert = alert => async (dispatch) => {
  const response = await alertService.deleteAlert(alert);
  if (response.error) {
    dispatch(apiCallActions.apiCallError(response.error));
    await timeout(4000);
    resetError(dispatch);
  } else {
    dispatch(deleteAlertSuccess(alert));
  }
};
