import { Provider } from 'react-redux';
import React from 'react';

import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();

export default class RootApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
