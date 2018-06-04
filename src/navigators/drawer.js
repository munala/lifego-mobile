import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import CustomDrawer from '../components/Drawer/Custom';
import MyBucketlists from '../components/Drawer/MyBucketlists';
import Home from '../components/Drawer/Home';
import Profile from '../components/Drawer/Profile';
import Settings from '../components/Drawer/Settings';

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
