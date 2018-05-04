import { StackNavigator } from 'react-navigation';

import BucketListForm from '../components/BucketListForm';
import BucketList from '../components/Drawer/MyBucketlists/BucketList/';
import Items from '../components/Drawer/MyBucketlists/Items';

const myBucketlistsScreens = {
  MyBucketlists: {
    screen: BucketList,
  },
  items: {
    screen: Items,
  },
  newBucketlistForm: {
    screen: BucketListForm,
  },
};

export default StackNavigator(myBucketlistsScreens, {
  inittialRouteName: 'MyBucketlists',
  navigationOptions: {
    header: null,
  },
});
