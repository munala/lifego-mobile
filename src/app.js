import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import authNavigator from './navigators/auth';

const Stack = ({ routeName }) => {
  const AuthNavigator = authNavigator(routeName);
  return (<AuthNavigator />);
};

Stack.propTypes = {
  routeName: PropTypes.string.isRequired,
};

export default connect(({ authNavigator: { routeName } }) => ({ routeName }))(Stack);
