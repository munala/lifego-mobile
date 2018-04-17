import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadAllBucketlists } from '../../../actions/bucketlistActions';
import { getConversations } from '../../../actions/messageActions';
import { getNotifications } from '../../../actions/notificationActions';
import { getAlerts } from '../../../actions/userAlertActions';
import * as navigationActions from '../../../actions/navigationActions';
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

  componentDidMount = () => {
    this.props.actions.loadAllBucketlists();
    this.props.actions.getConversations();
    this.props.actions.getNotifications();
    this.props.actions.getAlerts();
  }

  onFocus = () => {
    this.setState({
      searchMode: true,
    });
  }

  onItemPress = async (bucketlist) => {
    await this.setState(() => ({
      searchMode: false,
    }));
    this.props.actions.setParams({
      params: { id: bucketlist.id, from: 'bucketlists' },
      navigator: 'allBucketlists',
    });
    this.props.actions.navigate({ route: 'bucketlist', navigator: 'allBucketlists' });
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  render() {
    const {
      route,
      actions: { navigate },
    } = this.props;
    const Tabs = TabNavigator(
      {
        Home: {
          screen: (() => (
            <HomeScreen
              imageHeights={this.state.imageHeights}
              handleHeader={this.handleHeader}
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
          screen: Notifications,
        },
      },
      {
        initialRouteName: route,
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
          onPressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode="bucketlists"
        />
        {
          this.state.searchMode ?
            <SearchResults
              onItemPress={this.onItemPress}
            /> :
            <Tabs
              onNavigationStateChange={() => {
                navigate({
                  route: 'bucketlists',
                  navigator: 'allBucketlists',
                });
                navigate({
                  route: 'MessageList',
                  navigator: 'conversations',
                });
              }}
            />
        }
      </View>
    );
  }
}

Home.propTypes = {
  route: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    getAlerts: PropTypes.func.isRequired,
    loadAllBucketlists: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  navigationData: { home: { route, params, previousRoute } },
}, ownProps) => ({
  ...ownProps,
  route,
  params,
  previousRoute,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
    getConversations,
    getNotifications,
    getAlerts,
    loadAllBucketlists,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
