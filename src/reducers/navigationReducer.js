import DrawerNav from '../navigators/drawer';
import HomeTabNav from '../navigators/home';
import AllBucketlistNavigator from '../navigators/allBucketlists';
import MessageNavigator from '../navigators/messages';
import MyBucketlistNavigator from '../navigators/myBucketlists';

import initialState from './initialState';

export const authNavigatorReducer = (state = initialState.authNavigator, action) => {
  if (action.navigator === 'AuthNavigator') {
    return {
      ...state,
      routeName: action.routeName,
    };
  }

  return state;
};

export const drawerNavigatorReducer = (state = initialState.DrawerNav, act) => {
  const action = act;
  if (!action.navigator && (action.routeName === 'DrawerOpen' || action.routeName === 'DrawerClose')) {
    action.navigator = 'DrawerNav';
  }
  if (action.navigator === 'DrawerNav') {
    const nextState = DrawerNav.router
      .getStateForAction(action, state);
    return nextState || state;
  }

  return state;
};

export const homeNavigatorReducer = (state = initialState.HomeTabNav, action) => {
  if (action.navigator === 'HomeTabNav') {
    const nextState = HomeTabNav.router
      .getStateForAction(action, state);
    return nextState || state;
  }

  return state;
};

export const allNavigatorReducer = (state = initialState.AllBucketlistNavigator, action) => {
  if (action.navigator === 'AllBucketlistNavigator') {
    const nextState = AllBucketlistNavigator.router
      .getStateForAction(action, state);
    return nextState || state;
  }

  return state;
};

export const messageNavigatorReducer = (state = initialState.MessageNavigator, action) => {
  if (action.navigator === 'MessageNavigator') {
    const nextState = MessageNavigator.router
      .getStateForAction(action, state);
    return nextState || state;
  }

  return state;
};

export const myNavigatorReducer = (state = initialState.MyBucketlistNavigator, action) => {
  if (action.navigator === 'MyBucketlistNavigator') {
    const nextState = MyBucketlistNavigator.router
      .getStateForAction(action, state);
    return nextState || state;
  }

  return state;
};
