import { TabNavigator } from 'react-navigation';

import HomeScreen from '../components/Drawer/Home/Bucketlists';
import Messages from '../components/Drawer/Home/Messages';
import Notifications from '../components/Drawer/Home/Notifications';
import UserAlerts from '../components/Drawer/Home/UserAlerts';
import TabIcon from '../components/Drawer/Home/TabIcon';

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
    tabBarComponent: TabIcon,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
  },
);
