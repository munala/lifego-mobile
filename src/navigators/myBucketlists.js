import { StackNavigator } from 'react-navigation';

import MyBucketlists from '../components/Drawer/MyBucketlists/Bucketlists';
import Bucketlist from '../containers/SingleList';
import BucketListForm from '../components/BucketListForm';

const myBucketlistsScreens = {
  bucketlists: {
    screen: MyBucketlists,
  },
  bucketlist: {
    screen: Bucketlist,
  },
  bucketlistForm: {
    screen: BucketListForm,
  },
};

export default StackNavigator(myBucketlistsScreens, {
  inittialRouteName: 'bucketlists',
  navigationOptions: { header: null },
});
