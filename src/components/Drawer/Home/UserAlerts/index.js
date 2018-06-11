/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  BackHandler,
  Image,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../styles';

class UserAlerts extends Component {
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.actions.navigate({
        navigator: 'HomeTabNav',
        route: 'HomeBucketlists',
      });
      return true;
    });
  }

  onRefresh = () => {
    this.props.actions.getAlerts();
  }

  getName = (alert) => {
    if (this.props.profile.id === alert.senderId) {
      return alert.receiverDisplayName || alert.receiverUsername;
    }
    return alert.senderDislayName || alert.senderUsername;
  }

  getUser = id => this.props.profile.friends.filter(user => user.id === id)[0]

  setPictureUrl = (alert) => {
    if (this.props.profile.id !== alert.receiverId) {
      return alert.receiverPictureUrl;
    }
    return alert.senderPictureUrl;
  }

  getUnreadCount = alert => alert.messages
    .filter(message => !message.read && message.receiverId === this.props.profile.id)
    .length

  markAllAsRead = () => {
    this.props.alerts.forEach((alert) => {
      this.markAsRead(alert);
    });
  }

  addFriend = (alert) => {
    this.props.actions.addFriend({ id: alert.userId });
    this.markAsRead(alert);
  }

  removeFriend = (alert) => {
    this.props.actions.removeFriend({ id: alert.userId });
    this.markAsRead(alert);
  }

  clear = () => {
    this.props.alerts.forEach((alert) => {
      this.deleteAlert(alert);
    });
  }

  goToProfile = (alert) => {
    this.markAsRead(alert);
    this.props.actions.navigate({
      route: 'Profile',
      navigator: 'DrawerNav',
      params: {
        viewProfile: true,
        fromRoute: 'Home',
      },
    });
  }

  markAsRead = async (alert) => {
    this.props.actions.markAlertAsRead(alert);
    this.props.actions.getOtherProfile(alert.userId);
  }

  deleteAlert = (alert) => {
    this.props.actions.deleteAlert(alert);
  }

  clearAlert = (alert) => {
    this.props.actions.deleteAlert(alert);
  }

  checkStatus = (alert) => {
    let read = true;
    alert.messages.forEach((message) => {
      if (!message.read && message.receiverId === this.props.profile.id) {
        read = false;
      }
    });
    return read;
  }

  checkFriend = (alert) => {
    let result = false;
    this.props.profile.friends.forEach((friend) => {
      if (friend.id === alert.userId) {
        result = true;
      }
    });
    return result;
  }

  stripHtml = text => text.replace(/<b>/g, '');

  action = async (alert) => {
    const isFriend = this.checkFriend(alert);
    if (isFriend) {
      await this.removeFriend(alert);
    } else {
      await this.addFriend(alert);
    }

    this.clearAlert(alert);
  };

  renderItem = ({ item: alert }) => {
    const isFriend = this.checkFriend(alert);
    return (
      <TouchableOpacity
        style={[styles.notificationView, {
          backgroundColor: alert.read ? 'transparent' : '#f7f7f7',
        }]}
        key={alert.id}
        onPress={() => this.goToProfile(alert)}
        activeOpacity={1}
      >
        <View style={styles.notification}>
          <Image
            style={[styles.avatar, styles.userAvatar]}
            source={
              alert.userPictureUrl ?
                { uri: (alert.userPictureUrl.replace(
                  (alert.userPictureUrl.includes('https://') ? 'https://' : 'http://'),
                  'https://',
                )) } :
                require('../../../../assets/images/user.png')
            }
          />
          <View style={styles.notificationDetails}>
            <View style={styles.topRow}>
              <Text
                numberOfLines={1}
                style={[styles.notificationText, {
                  fontWeight: 'bold',
                }]}
              >{alert.user}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.notificationText}
              >
                {' added you.'}
              </Text>
            </View>
            <View style={styles.topRow}>
              <TouchableOpacity
                style={[styles.personAction, isFriend && { backgroundColor: '#00bcd4' }]}
                onPress={() => this.action(alert)}
              >
                <Text
                  style={[styles.actionText, isFriend && { color: '#fff' }]}
                >
                  {isFriend ? 'Remove' : 'Add'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.personAction, {
                  marginLeft: 10,
                  backgroundColor: 'grey',
                  borderWidth: 0,
                }]}
                onPress={() => this.clearAlert(alert)}
              >
                <Text
                  style={[styles.actionText, { color: '#fff' }]}
                >
                  Ignore
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { alerts, currentApiCalls } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        {alerts.length > 0 &&
          <FlatList
            enableEmptySections
            keyExtractor={({ id }) => id.toString()}
            data={alerts}
            renderItem={this.renderItem}
            style={styles.listView}
            refreshControl={
              <RefreshControl
                refreshing={currentApiCalls > 0}
                onRefresh={this.onRefresh}
                colors={['#00bcd4']}
                tintColor="#eee"
              />
            }
          />
        }
        {
          this.props.alerts.length > 0 ?
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.read}
                onPress={this.markAllAsRead}
              >
                <Text style={styles.notificationActionText}>Mark all as read</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.read}
                onPress={this.clear}
              >
                <Text style={styles.notificationActionText}>Ignore all</Text>
              </TouchableOpacity>
            </View> :
            <View style={styles.none}>
              <Text style={styles.noneText}>Friend notifications come here</Text>
            </View>
        }
      </View>
    );
  }
}

UserAlerts.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    text: PropTypes.string,
    bucketlistId: PropTypes.number,
    read: PropTypes.bool,
  })).isRequired,
  actions: PropTypes.shape({
    addFriend: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired,
    markAlertAsRead: PropTypes.func.isRequired,
    deleteAlert: PropTypes.func.isRequired,
    getAlerts: PropTypes.func.isRequired,
    getOtherProfile: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
};

export default UserAlerts;
