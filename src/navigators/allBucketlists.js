import { StackNavigator } from 'react-navigation';

import AllBucketlists from '../components/Drawer/Home/Bucketlists/AllBucketlists';
import Bucketlist from '../containers/SingleList';
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
  initialRouteName: 'bucketlists',
  navigationOptions: { header: null },
});
