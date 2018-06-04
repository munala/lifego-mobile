import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import CustomDrawer from '../components/Drawer/Custom';
import MyBucketlists from '../screens/MyLists';
import Home from '../screens/HomeTabs';
import Profile from '../containers/Profile';
import Settings from '../containers/Settings';

const drawerScreens = {
  Home: {
    screen: Home,
  },
  Bucketlists: {
    screen: MyBucketlists,
  },
  Profile: {
    screen: Profile,
  },
  Settings: {
    screen: Settings,
  },
};

export default DrawerNavigator(
  drawerScreens,
  {
    navigationOptions: {
      header: false,
    },
    contentComponent: props => (
      <CustomDrawer
        {...props}
      />
    ),
  },
);
