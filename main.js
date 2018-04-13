import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage, Platform, ToastAndroid } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import jwtDecode from 'jwt-decode';
import Toast from 'react-native-root-toast';

import configureStore from './store/configureStore';
import App from './screens';
import socket from './socket';

const { store, persistor } = configureStore();
store.subscribe(() => {
  const { message, error } = store.getState();
  if (message) {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
    } else {
      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  }
  if (error) {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50,
      );
    } else {
      Toast.show(error, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  }
});
AsyncStorage.getItem('token').then((token) => {
  if (token && jwtDecode(token).exp >= Date.now() / 1000) {
    try {
      socket(store);
    } catch (err) { } // eslint-disable-line no-empty
  }
});

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
