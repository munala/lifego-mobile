import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
  const config = {
    key: 'app',
    storage: AsyncStorage,
    blacklist: [
      'currentApiCalls',
      'error',
      'allData',
      'data',
      'searchText',
      'components',
      'profile',
    ],
  };
  const store = createStore(
    persistReducer(config, rootReducer),
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant(), logger),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
