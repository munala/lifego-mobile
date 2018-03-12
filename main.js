import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from './store/configureStore';
import App from './screens';

const { store, persistor } = configureStore();
AsyncStorage.setItem('start', 'true');

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
