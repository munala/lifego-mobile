import { Provider } from 'react-redux';
import React from 'react';

import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
