import { StackNavigator } from 'react-navigation';

import Conversation from '../containers/Conversation';
import Conversations from '../containers/Conversations';

const messagesScreens = {
  MessageList: {
    screen: Conversations,
  },
  Conversation: {
    screen: Conversation,
  },
};

export default StackNavigator(messagesScreens, {
  inittialRouteName: 'MessageList',
  navigationOptions: { header: null },
});
