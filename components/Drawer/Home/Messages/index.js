import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Conversation from './Conversation';
import MessageList from './MessageList';
import styles from '../styles';

export default () => {
  const screens = {
    MessageList: {
      screen: MessageList,
    },
    Conversation: {
      screen: Conversation,
    },
  };
  const navigationOptions = {
    navigationOptions: { header: null },
  };
  const Stack = StackNavigator(screens, navigationOptions);
  return (
    <View style={styles.container}>
      <Stack />
    </View>
  );
};
