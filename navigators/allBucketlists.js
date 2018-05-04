import { StackNavigator } from 'react-navigation';

import AllBucketlists from '../components/Drawer/Home/Bucketlists/AllBucketlists';
import Bucketlist from '../components/Drawer/Home/Bucketlists/Bucketlist';
import BucketListForm from '../components/BucketListForm';

const allBucketlistsScreens = {
  bucketlists: {
    screen: AllBucketlists,
  },
  bucketlist: {
    screen: Bucketlist,
  },
  bucketlistForm: {
    screen: BucketListForm,
  },
};

export default StackNavigator(allBucketlistsScreens, {
  inittialRouteName: 'bucketlists',
  navigationOptions: { header: null },
});
