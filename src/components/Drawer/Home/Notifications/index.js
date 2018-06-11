/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  BackHandler,
  Image,
} from 'react-native';

import Text from '../../../Common/SuperText';
import { setTime } from '../../../../utils';
import styles from '../styles';

class Notifications extends Component {
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
    this.props.actions.getNotifications();
  }

  getName = (notification) => {
    if (this.props.profile.id === notification.senderId) {
      return notification.receiverDisplayName || notification.receiverUsername;
    }
    return notification.senderDislayName || notification.senderUsername;
  }

  getUser = id => this.props.profile.friends.filter(user => user.id === id)[0]

  setPictureUrl = (notification) => {
    if (this.props.profile.id !== notification.receiverId) {
      return notification.receiverPictureUrl;
    }
    return notification.senderPictureUrl;
  }

  getUnreadCount = notification => notification.messages
    .filter(message => !message.read && message.receiverId === this.props.profile.id).length

  markAllAsRead = () => {
    this.props.notifications.forEach((notification) => {
      this.markAsRead(notification);
    });
  }

  clear = () => {
    this.props.notifications.forEach((notification) => {
      this.deleteNotification(notification);
    });
  }

  markAsRead = (notification) => {
    this.props.actions.markNotificationAsRead(notification);
  }

  deleteNotification = (notification) => {
    this.props.actions.deleteNotification(notification);
  }

  checkStatus = (notification) => {
    let read = true;
    notification.messages.forEach((message) => {
      if (!message.read && message.receiverId === this.props.profile.id) {
        read = false;
      }
    });
    return read;
  }

  goToBucketlist = async (notification) => {
    this.markAsRead(notification);
    await this.props.actions.navigate({
      route: 'HomeBucketlists',
      navigator: 'HomeTabNav',
    });
    this.props.actions.navigate({
      route: 'bucketlist',
      navigator: 'AllBucketlistNavigator',
      params: {
        bucketlist: {
          id: notification.bucketlistId,
          name: 'Bucketlist',
        },
        fromRoute: 'Notifications',
        navigator: 'AllBucketlistNavigator',
      },
    });
  }

  stripHtml = text => text.replace('<b>', '').replace('</b>', '').replace('<br/>', ' ')

  renderItem = ({ item: notification }) => {
    const { createdAt, time } = setTime(notification);
    const dateTime = `${createdAt}${time}`;

    return (
      <TouchableOpacity
        style={[styles.notificationView, {
          backgroundColor: notification.read ? 'transparent' : '#f7f7f7',
        }]}
        key={notification.id}
        onPress={() => this.goToBucketlist(notification)}
        activeOpacity={1}
      >
        <View style={styles.notification}>
          <Image
            style={[styles.avatar, { marginRight: 10 }]}
            source={
              notification.userPictureUrl ?
                { uri: (notification.userPictureUrl.replace(
                  (notification.userPictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
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
              >{notification.user}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.notificationText}
              >
                {notification.type === 'comment' ? ` commented: "${notification.text}".` : ' likes your bucketlist.'}
              </Text>
            </View>
            <Text style={[styles.timeSent, {
              alignSelf: 'flex-start',
              color: notification.read ? 'grey' : '#00bcd4',
            }]}
            >{dateTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { notifications, currentApiCalls } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        {this.props.notifications.length > 0 &&
          <FlatList
            enableEmptySections
            keyExtractor={({ id }) => id.toString()}
            data={notifications}
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
          this.props.notifications.length > 0 ?
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.read}
                onPress={this.markAllAsRead}
              >
                <Text style={styles.notificationActionText}>mark all as read</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.read}
                onPress={this.clear}
              >
                <Text style={styles.notificationActionText}>clear</Text>
              </TouchableOpacity>
            </View> :
            <View style={styles.none}>
              <Text style={styles.noneText}>Notifications come here</Text>
            </View>
        }
      </View>
    );
  }
}

Notifications.propTypes = {
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
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    text: PropTypes.string,
    bucketlistId: PropTypes.number,
    read: PropTypes.bool,
  })).isRequired,
  actions: PropTypes.shape({
    markNotificationAsRead: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
};

export default Notifications;
