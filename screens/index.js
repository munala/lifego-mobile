import { StackNavigator } from 'react-navigation';
import User from '../components/User';
import Drawer from '../components/Drawer';

const screens = {
  user: {
    screen: User,
  },
  home: {
    screen: Drawer,
  },
};
export default StackNavigator(screens, { navigationOptions: {
  header: null,
  gesturesEnabled: false,
} });
