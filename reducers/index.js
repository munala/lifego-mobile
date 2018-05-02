import { combineReducers } from 'redux';
import data from './bucketlistReducer';
import allData from './allBucketlistReducer';
import loggedIn from './userReducer';
import currentApiCalls from './apiCallReducer';
import error from './errorReducer';
import message from './messageReducer';
import profile from './profileReducer';
import otherProfile from './otherProfileReducer';
import conversations from './chatReducer';
import notifications from './notificationReducer';
import alerts from './userAlertReducer';
import tags from './tagReducer';
import searchText from './searchReducer';
import components from './componentReducer';
import {
  authNavigatorReducer as authNavigator,
  drawerNavigatorReducer as DrawerNav,
  homeNavigatorReducer as HomeTabNav,
  allNavigatorReducer as AllBucketlistNavigator,
  messageNavigatorReducer as MessageNavigator,
  myNavigatorReducer as MyBucketlistNavigator,
} from './navigationReducer';
import { LOGOUT } from '../actions/actionTypes';

const appReducer = combineReducers({
  data,
  allData,
  currentApiCalls,
  loggedIn,
  error,
  message,
  profile,
  otherProfile,
  conversations,
  notifications,
  alerts,
  tags,
  searchText,
  components,
  authNavigator,
  DrawerNav,
  HomeTabNav,
  AllBucketlistNavigator,
  MessageNavigator,
  MyBucketlistNavigator,
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === LOGOUT) {
    newState = undefined;
  }
  return appReducer(newState, action);
};

export default rootReducer;
