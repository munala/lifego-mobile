import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

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
      route,
    } = this.props;
    const screens = {
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
    const navigationOptions = {
      navigationOptions: { header: null },
      initialRouteName: route,
    };
    const Stack = StackNavigator(screens, navigationOptions);
    return (
      <View style={styles.container}>
        <Stack />
      </View>
    );
  }
}

HomeView.propTypes = {
  route: PropTypes.string.isRequired,
};

export default connect((({
  navigationData: {
    allBucketlists: {
      route,
    },
  },
}) => ({
  route,
})))(HomeView);
