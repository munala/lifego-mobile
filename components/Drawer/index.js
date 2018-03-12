import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Platform, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MyBucketlists from './MyBucketlists';
import Home from './Home';
import Profile from './Profile';

const { height } = Dimensions.get('window');

const passNavigate = (navigate, drawerLabel, icon, Comp) => (
  class DrawerComponent extends Component {
    static navigationOptions = {
      drawerLabel,
      drawerIcon: (
        <Icon
          type="material-icons"
          name={icon}
          color="#00bcd4"
        />
      ),
    }

    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({}).isRequired,
      }).isRequired,
    }

    render() {
      const { navigation } = this.props;
      return (
        <Comp nav={navigate} navigation={navigation} />
      );
    }
  }
);

const Drawer = ({ navigation: { navigate } }) => {
  const HomeComponent = passNavigate(navigate, 'Home', 'home', Home);
  const MyBucketlistsComponent = passNavigate(navigate, 'My Bucketlists', 'list', MyBucketlists);
  const ProfileComponent = passNavigate(navigate, 'Profile', 'person', Profile);
  const screens = {
    Home: {
      screen: HomeComponent,
    },
    Bucketlists: {
      screen: MyBucketlistsComponent,
    },
    Profile: {
      screen: ProfileComponent,
    },
  };
  const DrawerNav = DrawerNavigator(
    screens,
    {
      navigationOptions: {
        header: false,
      },
      contentOptions: {
        inactiveTintColor: 'grey',
        activeTintColor: '#00bcd4',
        style: {
          paddingTop: height === 812 && Platform.OS === 'ios' ? 28 : 0,
        },
      },
    });
  return (
    <DrawerNav />
  );
};

Drawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default Drawer;
