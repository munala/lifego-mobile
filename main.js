import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from './store/configureStore';
import App from './App';

const { store, persistor } = configureStore();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
