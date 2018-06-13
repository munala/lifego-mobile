import { TabNavigator } from 'react-navigation';

import HomeScreen from '../screens/AllLists';
import Messages from '../screens/Conversations';
import Notifications from '../containers/Notifications';
import UserAlerts from '../containers/UserAlerts';
import TabIcons from '../containers/TabIcons';

const tabScreens = {
  HomeBucketlists: {
    screen: HomeScreen,
  },
  Messages: {
    screen: Messages,
  },
  UserAlerts: {
    screen: UserAlerts,
  },
  Notifications: {
    screen: Notifications,
  },
};

export default TabNavigator(
  tabScreens,
  {
    inittialRouteName: 'HomeBucketlists',
    tabBarComponent: TabIcons,
    tabBarPosition: 'bottom',
  },
);
