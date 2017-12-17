import React from 'react';
import { StackNavigator } from 'react-navigation';
import BucketList from './components/BucketList';
import Items from './components/Items';
import BucketListForm from './components/BucketListForm';
import UserForm from './components/UserForm';

const screens = {
  user: {
    screen: UserForm,
  },
  bucketlist: {
    screen: BucketList,
  },
  items: {
    screen: Items,
  },
  bucketlistform: {
    screen: BucketListForm,
  },
};
const RootApp = StackNavigator(screens);

export default () => (
  <RootApp />
);
