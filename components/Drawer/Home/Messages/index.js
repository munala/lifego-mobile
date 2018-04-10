import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Conversation from './Conversation';
import MessageList from './MessageList';
import styles from '../styles';

const Messages = ({ route }) => {
  const screens = {
    MessageList: {
      screen: MessageList,
    },
    Conversation: {
      screen: Conversation,
    },
  };
  const navigationOptions = {
    initialRouteName: route,
    navigationOptions: { header: null },
  };
  const Stack = StackNavigator(screens, navigationOptions);
  return (
    <View style={styles.container}>
      <Stack />
    </View>
  );
};

Messages.propTypes = {
  route: PropTypes.string.isRequired,
};

export default connect(({ navigationData: { conversations: { route } } }) => ({ route }))(Messages);
