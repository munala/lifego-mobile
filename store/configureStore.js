import { applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers';

import rootReducer from '../reducers';

const drawerMiddleware = createReactNavigationReduxMiddleware(
  'DrawerNav',
  state => state.DrawerNav,
);

const homeMiddleware = createReactNavigationReduxMiddleware(
  'HomeTabNav',
  state => state.HomeTabNav,
);

const allMiddleware = createReactNavigationReduxMiddleware(
  'AllBucketlistNavigator',
  state => state.AllBucketlistNavigator,
);

const myMiddleware = createReactNavigationReduxMiddleware(
  'MyBucketlistNavigator',
  state => state.MyBucketlistNavigator,
);

const messageMiddleware = createReactNavigationReduxMiddleware(
  'MessageNavigator',
  state => state.MessageNavigator,
);

export const addDrawerListener = createReduxBoundAddListener('DrawerNav');
export const addHomeListener = createReduxBoundAddListener('HomeTabNav');
export const addAllListener = createReduxBoundAddListener('AllBucketlistNavigator');
export const addMyListener = createReduxBoundAddListener('MyBucketlistNavigator');
export const addMessageListener = createReduxBoundAddListener('MessageNavigator');

const configureStore = (initialState) => {
  const config = {
    key: 'app',
    storage: AsyncStorage,
    blacklist: [
      'currentApiCalls',
      'error',
      'searchText',
      'components',
      'authNavigator',
      // 'AuthNavigator',
      'DrawerNav',
      'HomeTabNav',
      'AllBucketlistNavigator',
      'MessageNavigator',
      'MyBucketlistNavigator',
    ],
  };

  const store = Reactotron.createStore(
    persistReducer(config, rootReducer),
    initialState,
    applyMiddleware(
      drawerMiddleware,
      homeMiddleware,
      allMiddleware,
      myMiddleware,
      messageMiddleware,
      thunk,
      reduxImmutableStateInvariant(),
      logger,
    ),
  );

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
