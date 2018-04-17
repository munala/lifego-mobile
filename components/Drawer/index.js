import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import navigationOptionsWrapper from './navigationOptionsWrapper';
import CustomDrawer from './Custom';
import MyBucketlists from './MyBucketlists';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import { loadAllBucketlists } from '../../actions/bucketlistActions';
import { getConversations } from '../../actions/messageActions';
import { getNotifications } from '../../actions/notificationActions';
import { getAlerts } from '../../actions/userAlertActions';

class Drawer extends Component {
  componentDidMount = () => {
    this.props.actions.loadAllBucketlists();
    this.props.actions.getConversations();
    this.props.actions.getNotifications();
    this.props.actions.getAlerts();
  }

  render() {
    const { route } = this.props;

    const HomeComponent = navigationOptionsWrapper({
      drawerLabel: 'Home',
      icon: 'home',
      ReturnComponent: Home,
    });

    const MyBucketlistsComponent = navigationOptionsWrapper({
      drawerLabel: 'My Bucketlists',
      icon: 'list',
      ReturnComponent: MyBucketlists,
    });

    const ProfileComponent = navigationOptionsWrapper({
      drawerLabel: 'Profile',
      icon: 'person',
      ReturnComponent: Profile,
    });

    const SettingsComponent = navigationOptionsWrapper({
      drawerLabel: 'Settings',
      icon: 'settings',
      ReturnComponent: Settings,
    });

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
  }
}

Drawer.propTypes = {
  route: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    loadAllBucketlists: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    getAlerts: PropTypes.func.isRequired,
  }).isRequired,
};

Drawer.propTypes = {
  route: PropTypes.string.isRequired,
};

const mapStateToProps = ({ navigationData: { drawer: { route, params } } }) => ({
  route,
  params,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadAllBucketlists,
    getConversations,
    getNotifications,
    getAlerts,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
