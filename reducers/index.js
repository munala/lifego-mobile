import { combineReducers } from 'redux';
import data from './bucketlistReducer';
import allData from './allBucketlistReducer';
import loggedIn from './userReducer';
import currentApiCalls from './apiCallReducer';
import error from './errorReducer';
import message from './messageReducer';
import profile from './profileReducer';
import conversations from './chatReducer';
import notifications from './notificationReducer';
import alerts from './userAlertReducer';
import tags from './tagReducer';
import searchText from './searchReducer';
import components from './componentReducer';
import navigationData from './navigationReducer';
import { LOGOUT } from '../actions/actionTypes';

const appReducer = combineReducers({
  data,
  allData,
  currentApiCalls,
  loggedIn,
  error,
  message,
  profile,
  conversations,
  notifications,
  alerts,
  tags,
  searchText,
  components,
  navigationData,
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === LOGOUT) {
    newState = undefined;
  }
  return appReducer(newState, action);
};

export default rootReducer;
