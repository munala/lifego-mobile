import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getConversations } from '../../../actions/messageActions';
import { getNotifications } from '../../../actions/notificationActions';
import { getAlerts } from '../../../actions/userAlertActions';
import TabIcon from './TabIcon';
import Header from '../../Common/Header';
import SearchResults from '../../Common/SearchResults';
import HomeScreen from './Bucketlists';
import Messages from './Messages';
import Notifications from './Notifications';
import UserAlerts from './UserAlerts';
import styles from './styles';

class Home extends Component {
  state = {
    searchMode: false,
  }

  componentWillMount = () => {
    Object.keys(this.props.actions).forEach(key => this.props.actions[key]());
  }

  onFocus = () => {
    this.setState({
      searchMode: true,
    });
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  render() {
    const {
      navigation,
      navigateTopStack,
    } = this.props;
    const Tabs = TabNavigator(
      {
        Home: {
          screen: (({ navigation: tabNavigation }) => (
            <HomeScreen
              drawerNavigation={navigation}
              imageHeights={this.state.imageHeights}
              handleHeader={this.handleHeader}
              navigateTopStack={navigateTopStack}
              tabNavigation={tabNavigation}
            />
          )),
        },
        Messages: {
          screen: Messages,
        },
        UserAlerts: {
          screen: UserAlerts,
        },
        Notifications: {
          screen: (({ navigation: tabNavigation }) => (
            <Notifications
              drawerNavigation={navigation}
              tabNavigation={tabNavigation}
            />
          )),
        },
      },
      {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          activeTintColor: '#00bcd4',
          inactiveTintColor: 'gray',
          showIcon: true,
          showLabel: false,
          style: styles.tabBarOptions,
          indicatorStyle: styles.indicatorStyle,
        },
        navigationOptions: ({ navigation: { state } }) => ({
          tabBarIcon: ({ tintColor }) => {
            const { routeName } = state;
            const names = {
              Home: 'home',
              Messages: 'message',
              UserAlerts: 'person-add',
              Notifications: 'notifications',
            };
            const types = {
              Home: 'allData',
              Messages: 'conversations',
              UserAlerts: 'alerts',
              Notifications: 'notifications',
            };
            const name = names[routeName];
            const type = types[routeName];
            const iconProps = {
              name,
              tintColor,
              type,
            };
            return (<TabIcon {...iconProps} />);
          },
        }),
      },
    );
    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title="Home"
          leftIcon="menu"
          onPressLeft={() => navigation.navigate('DrawerOpen')}
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode="bucketlists"
          navigation={navigation}
          navigateTopStack={navigateTopStack}
        />
        {
          this.state.searchMode ?
            <SearchResults
              onItemPress={() => {}}
            /> :
            <Tabs />
        }
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
  navigateTopStack: PropTypes.func.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getConversations,
    getNotifications,
    getAlerts,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
