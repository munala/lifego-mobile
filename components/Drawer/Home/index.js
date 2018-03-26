import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

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
    const Tabs = TabNavigator({
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
        screen: (({ navigation: tabNavigation }) => (
          <UserAlerts
            drawerNavigation={navigation}
            tabNavigation={tabNavigation}
          />
        )),
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
        style: {
          backgroundColor: 'white',
          marginTop: 0,
          elevation: 10,
          borderTopWidth: Platform.OS === 'ios' ? 5 : 0,
          borderTopColor: '#00bcd4',
        },
        indicatorStyle: {
          backgroundColor: '#00bcd4',
        },
      },
      navigationOptions: ({ navigation: { state } }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = state;
          const names = {
            Home: 'home',
            Messages: 'message',
            UserAlerts: 'person-add',
            Notifications: 'notifications',
          };
          return <Icon name={names[routeName]} size={focused ? 25 : 20} color={tintColor} />;
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
  // conversations: PropTypes.arrayOf(PropTypes.shape({
  //   username: PropTypes.string,
  //   displayName: PropTypes.string,
  //   email: PropTypes.string,
  //   pictureUrl: PropTypes.string,
  // })).isRequired,
  // notifications: PropTypes.arrayOf(PropTypes.shape({
  //   type: PropTypes.string,
  //   bucketlistId: PropTypes.number,
  //   text: PropTypes.string,
  // })).isRequired,
  // alerts: PropTypes.arrayOf(PropTypes.shape({
  //   type: PropTypes.string,
  //   userId: PropTypes.number,
  //   friendId: PropTypes.number,
  //   text: PropTypes.string,
  // })).isRequired,
  // profile: PropTypes.shape({
  //   id: PropTypes.number,
  //   username: PropTypes.string,
  //   displayName: PropTypes.string,
  //   email: PropTypes.string,
  //   pictureUrl: PropTypes.string,
  //   friends: PropTypes.arrayOf(PropTypes.shape({})),
  //   searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  // }).isRequired,
  // bucketlists: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string,
  //   id: PropTypes.number,
  //   createdAt: PropTypes.string,
  //   updatedAt: PropTypes.string,
  //   description: PropTypes.string,
  //   items: PropTypes.arrayOf(PropTypes.shape({
  //     name: PropTypes.string,
  //     id: PropTypes.number,
  //     createdAt: PropTypes.string,
  //     updatedAt: PropTypes.string,
  //     done: PropTypes.bool,
  //   })),
  //   comments: PropTypes.arrayOf(PropTypes.shape({
  //     content: PropTypes.string,
  //     id: PropTypes.number,
  //     createdAt: PropTypes.string,
  //     updatedAt: PropTypes.string,
  //   })),
  // })).isRequired,
  // actions: PropTypes.shape({
  //   loadAllBucketlists: PropTypes.func.isRequired,
  //   logout: PropTypes.func.isRequired,
  //   search: PropTypes.func.isRequired,
  //   clearSearch: PropTypes.func.isRequired,
  // }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
  navigateTopStack: PropTypes.func.isRequired,
};

export default Home;
