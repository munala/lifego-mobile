import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default(
  state = initialState.notifications,
  action,
) => {
  switch (action.type) {
    case types.NEW_NOTIFICATION:
      return [action.notification, ...state];

    case types.GET_NOTIFICATIONS:
      return action.notifications;

    case types.EDIT_NOTIFICATION:
      return [...state].map((notification) => {
        if (notification.id === action.notification.id) {
          return action.notification;
        }
        return notification;
      });

    case types.DELETE_NOTIFICATION:
      return [...state].filter(notification => notification.id !== action.notification.id);

    default:
      return state;
  }
};
