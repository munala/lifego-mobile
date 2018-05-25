import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../../Common/SuperText';
import * as notificationActions from '../../../../actions/notificationActions';
import * as navigationActions from '../../../../actions/navigationActions';
import styles from '../styles';

class Notifications extends Component {
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
    await this.props.actions.navigate({ route: 'HomeBucketlists', navigator: 'HomeTabNav' });
    this.props.actions.navigate({
      route: 'bucketlist',
      navigator: 'AllBucketlistNavigator',
      params: {
        bucketlist: { id: notification.bucketlistId }, from: 'Notifications', navigator: 'AllBucketlistNavigator',
      },
    });
  }

  stripHtml = text => text.replace('<b>', '').replace('</b>', '').replace('<br/>', ' ')

  renderItem = ({ item: notification }) => {
    const icons = {
      comment: 'comment',
      like: 'grade',
    };

    return (
      <TouchableOpacity
        style={styles.notificationView}
        key={notification.id}
        onPress={() => this.goToBucketlist(notification)}
        activeOpacity={1}
      >
        <View style={styles.notification}>
          <Icon
            containerStyle={styles.notificationIcon}
            iconStyle={styles.icon}
            type="material-icons"
            name={icons[notification.type]}
            color="#aaa"
            size={20}
          />
          <Text style={[styles.notificationText, {
            color: notification.read ? 'grey' : '#009baf',
          }]}
          >{this.stripHtml(notification.text)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { notifications, currentApiCalls } = this.props;
    return (
      <View style={styles.container}>
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
              <Text style={styles.noneText}>{'you\'re all caught up'}</Text>
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

const mapStateToProps = ({
  profile, notifications, currentApiCalls: { notifications: currentApiCalls },
}, ownProps) => ({
  profile,
  notifications,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...notificationActions, ...navigationActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
