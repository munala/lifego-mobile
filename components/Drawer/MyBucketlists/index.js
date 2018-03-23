import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import BucketList from './BucketList/';
import Items from './Items';
import BucketListForm from '../../BucketListForm';
import styles from './styles';

class StackNav extends Component {
  render() {
    const { navigateTopStack, drawerNavigation } = this.props;
    const Navigator = ({ navigation }) => (
      <BucketList
        navigateTopStack={navigateTopStack}
        drawerNavigation={drawerNavigation}
        navigation={navigation}
        handleResults={this.handleResults}
      />
    );
    Navigator.propTypes = {
      navigation: PropTypes.shape({}).isRequired,
    };

    const screens = {
      bucketlist: {
        screen: Navigator,
      },
      items: {
        screen: Items,
      },
      bucketlistForm: {
        screen: ({ navigation }) => (
          <View style={styles.container}>
            <BucketListForm navigation={navigation} />
          </View>
        ),
      },
    };

    const Stack = StackNavigator(screens, { navigationOptions: {
      header: null,
    } });
    return (
      <Stack />
    );
  }
}

StackNav.propTypes = {
  navigateTopStack: PropTypes.func.isRequired,
  drawerNavigation: PropTypes.shape({}).isRequired,
};

export default StackNav;
