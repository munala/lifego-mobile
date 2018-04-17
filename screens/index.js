import React from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import User from '../components/User';
import Drawer from '../components/Drawer';
import Splash from '../components/Splash';
import Intro from '../components/Intro';

const screens = {
  splash: {
    screen: Splash,
  },
  user: {
    screen: User,
  },
  home: {
    screen: Drawer,
  },
  intro: {
    screen: Intro,
  },
};

const Stack = ({ route }) => {
  const Navigator = StackNavigator(screens, {
    initialRouteName: route,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  });
  return (<Navigator />);
};

Stack.propTypes = {
  route: PropTypes.string.isRequired,
};

export default connect(({ navigationData: { auth: { route } } }) => ({
  route,
}))(Stack);
