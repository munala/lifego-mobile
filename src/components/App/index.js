import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import authNavigator from '../../navigators/auth';

const Stack = ({ routeName }) => {
  const AuthNavigator = authNavigator(routeName);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      <AuthNavigator />
    </SafeAreaView>
  );
};

Stack.propTypes = {
  routeName: PropTypes.string.isRequired,
};

export default Stack;
