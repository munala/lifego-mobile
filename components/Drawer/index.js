import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import CustomDrawer from './Custom';
import MyBucketlists from './MyBucketlists';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';


const navigationOptionsWrapper = (drawerLabel, icon, Comp) => (
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
      }).isRequired,
    }

    render() {
      return (
        <Comp navigation={this.props.navigation} />
      );
    }
  }
);

const Drawer = ({ route }) => {
  const HomeComponent = navigationOptionsWrapper('Home', 'home', Home);
  const MyBucketlistsComponent = navigationOptionsWrapper('My Bucketlists', 'list', MyBucketlists);
  const ProfileComponent = navigationOptionsWrapper('Profile', 'person', Profile);
  const SettingsComponent = navigationOptionsWrapper('Settings', 'settings', Settings);
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
    Settings: {
      screen: SettingsComponent,
    },
  };
  const DrawerNav = DrawerNavigator(
    screens,
    {
      initialRouteName: route,
      navigationOptions: {
        header: false,
      },
      contentOptions: {
        inactiveTintColor: 'grey',
        activeTintColor: '#00bcd4',
      },
      contentComponent: props => <CustomDrawer {...props} />,
    },
  );
  return (
    <DrawerNav />
  );
};

Drawer.propTypes = {
  route: PropTypes.string.isRequired,
};

const mapStateToProps = ({ navigationData: { drawer: { route, params } } }, ownProps) => ({
  ...ownProps,
  route,
  params,
});

export default connect(mapStateToProps)(Drawer);
