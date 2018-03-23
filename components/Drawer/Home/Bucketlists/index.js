import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AllBucketlists from './AllBucketlists';
import Bucketlist from './Bucketlist';
import styles from '../styles';
import BucketListForm from '../../../BucketListForm';

class HomeView extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (<Icon name="home" size={25} color={focused ? '#fff' : 'grey'} />),
  }

  render() {
    const {
      drawerNavigation,
      navigateTopStack,
    } = this.props;
    const screens = {
      bucketlists: {
        screen: (({ navigation }) => (
          <AllBucketlists
            drawerNavigation={drawerNavigation}
            navigation={navigation}
            navigateTopStack={navigateTopStack}
          />
        )),
      },
      bucketlist: {
        screen: Bucketlist,
      },
      bucketlistForm: {
        screen: BucketListForm,
      },
    };
    const Stack = StackNavigator(screens, { navigationOptions: {
      header: null,
    } });
    return (
      <View style={styles.container}>
        <Stack />
      </View>
    );
  }
}

HomeView.propTypes = {
  drawerNavigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigateTopStack: PropTypes.func.isRequired,
};

export default HomeView;
