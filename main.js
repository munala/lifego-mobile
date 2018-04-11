import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import jwtDecode from 'jwt-decode';

import configureStore from './store/configureStore';
import App from './screens';
import socket from './socket';

const { store, persistor } = configureStore();
AsyncStorage.getItem('token').then((token) => {
  if (token && jwtDecode(token).exp >= Date.now() / 1000) {
    socket(store);
  }
});

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
