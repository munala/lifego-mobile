import React from 'react';
import PropTypes from 'prop-types';

import authNavigator from '../../navigators/auth';

const Stack = ({ routeName }) => {
  const AuthNavigator = authNavigator(routeName);

  return (<AuthNavigator />);
};

Stack.propTypes = {
  routeName: PropTypes.string.isRequired,
};

export default Stack;
