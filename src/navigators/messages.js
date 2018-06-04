import { StackNavigator } from 'react-navigation';

import Conversation from '../components/Drawer/Home/Messages/Conversation';
import MessageList from '../components/Drawer/Home/Messages/MessageList';

const messagesScreens = {
  MessageList: {
    screen: MessageList,
  },
  Conversation: {
    screen: Conversation,
  },
};

export default StackNavigator(messagesScreens, {
  inittialRouteName: 'MessageList',
  navigationOptions: { header: null },
});
