import SocketIOClient from 'socket.io-client';
import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS as Push, DeviceEventEmitter } from 'react-native';

import * as messageActions from '../actions/messageActions';
import * as commentActions from '../actions/commentActions';
import * as likeActions from '../actions/likeActions';
import * as notificationActions from '../actions/notificationActions';
import * as bucketlistActions from '../actions/bucketlistActions';
import * as userActions from '../actions/userActions';
import * as userAlertActions from '../actions/userAlertActions';

export default (store) => {
  const socket = SocketIOClient('https://bucketlist-node.herokuapp.com');

  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification(notification) {
      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(Push.FetchResult.NoData);
    },
  });

  const stripHtml = text => text.replace('<b>', '').replace('</b>', '').replace('<br/>', ' ');

  const sendNotification = ({
    bigText, subText, icon, title, message, vibration, actions, data,
  }) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      autoCancel: true, // (optional) default: true
      largeIcon: icon, // (optional) default: "ic_launcher"
      smallIcon: icon, // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText, // (optional) default: "message" prop
      subText, // (optional) default: none
      color: '#00bcd4', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      title, // (optional)
      message, // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      actions, // (Android only) See the doc for notification actions to know more
      data,
    });
  };

  PushNotification.registerNotificationActions(['Mark as read']);
  DeviceEventEmitter.addListener('notificationActionReceived', (action) => {
    const info = JSON.parse(action.dataJSON);
    if (info.action === 'Mark as read') {
      messageActions.markAsRead({ id: info.data.id });
    }
    if (info.action === 'Add back') {
      userActions.addFriend({ id: info.data.id });
    }
  });

  socket.on('messages', (data) => {
    const storeData = store.getState();
    if (data.type === 'new' && storeData.profile.id === data.message.receiverId) {
      store.dispatch(messageActions.sendMessageSuccess(data.message));
      const users = [...storeData.profile.friends, ...storeData.profile.followers];
      const [user] = users.filter(use => use.id === data.message.senderId);
      sendNotification({
        bigText: data.message.content,
        subText: 'Tap to view message',
        icon: 'message',
        title: `New message from ${user.displayName}`,
        message: data.message.content,
        vibration: 500,
        data: { type: 'message', id: data.message.id },
      });
    }
    if (data.type === 'update') {
      store.dispatch(messageActions.deleteMessageSuccess({ message: data.message }));
    }
    if (data.type === 'delete') {
      store.dispatch(messageActions.deleteMessageSuccess({ message: data.message }));
    }
  });

  socket.on('conversations', (data) => {
    const storeData = store.getState();
    if (data.type === 'new' && (storeData.profile.id === data.conversation.receiverId)) {
      store.dispatch(messageActions.startConversationSuccess(data.conversation));
    }
    if (data.type === 'delete') {
      store.dispatch(messageActions.deleteConversationSuccess({ message: '', conversation: data.conversation }));
    }
  });

  socket.on('notifications', (data) => {
    const storeData = store.getState();
    let notify;
    storeData.data.bucketlists.forEach((bucketlist) => {
      if (bucketlist.id === data.notification.bucketlistId) {
        notify = true;
      }
    });
    storeData.allData.bucketlists.forEach((bucketlist) => {
      if (bucketlist.id === data.notification.bucketlistId) {
        notify = true;
      }
    });
    if (data.type === 'new' && notify && data.notification.sourceUserId !== storeData.profile.id) {
      store.dispatch(notificationActions.newNotification({ notification: data.notification }));
    }
  });

  socket.on('bucketlists', (data) => {
    const storeData = store.getState();
    if (data.type === 'new') {
      storeData.profile.friends.forEach((friend) => {
        if (friend.id === data.bucketlist.userId) {
          store.dispatch(bucketlistActions.addNewBucketlist({
            ...data.bucketlist,
            comments: [],
            likes: [],
            items: [],
          }));
        }
      });
    }
    if (data.type === 'update') {
      storeData.profile.friends.forEach((friend) => {
        if (friend.id === data.bucketlist.userId) {
          store.dispatch(bucketlistActions.updateBucketlistSuccess(data.bucketlist));
        }
      });
    }
    if (data.type === 'delete') {
      storeData.profile.friends.forEach((friend) => {
        if (friend.id === data.bucketlist.userId) {
          store.dispatch(bucketlistActions.deleteBucketlistSuccess(data.bucketlist));
        }
      });
    }
  });

  socket.on('comments', (data) => {
    const storeData = store.getState();
    if (data.type === 'new') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (data.sourceUserId !== storeData.profile.id &&
            bucketlist.id === data.comment.bucketlistId) {
            store.dispatch(commentActions.addCommentSuccess({
              id: data.comment.bucketlistId,
            }, data.comment));
            sendNotification({
              bigText: stripHtml(data.comment.content),
              subText: 'Tap to view comment',
              icon: 'comment',
              title: `New comment from ${data.comment.user}`,
              message: `'${stripHtml(data.comment.content)}'`,
              vibration: 300,
              data: { type: 'comment', id: data.comment.id },
            });
          }
        });
      });
    }
    if (data.type === 'update') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (data.sourceUserId !== storeData.profile.id &&
          bucketlist.id === data.comment.bucketlistId) {
            store.dispatch(commentActions.updateCommentSuccess({
              id: data.comment.bucketlistId,
            }, data.comment));
          }
        });
      });
    }
    if (data.type === 'delete') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (data.sourceUserId !== storeData.profile.id &&
          bucketlist.id === data.comment.bucketlistId) {
            store.dispatch(commentActions.deleteCommentSuccess({
              id: data.comment.bucketlistId,
            }, data.comment));
          }
        });
      });
    }
  });

  socket.on('likes', (data) => {
    const storeData = store.getState();
    if (data.type === 'like') {
      [storeData.data, storeData.allData].forEach((list) => {
        list.bucketlists.forEach((bucketlist) => {
          if (data.like.likerId !== storeData.profile.id &&
          bucketlist.id === data.like.bucketlistId) {
            store.dispatch(likeActions.likeSuccess({
              id: data.like.bucketlistId,
            }, data.like));
            sendNotification({
              bigText: `${data.like.userDisplayName} liked your bucketlist`,
              icon: 'star',
              title: 'New star',
              message: `${data.like.userDisplayName} liked your bucketlist`,
              vibration: 0,
              data: { type: 'like', id: data.like.id },
            });
          }
        });
      });
    }
    if (data.type === 'unlike') {
      store.dispatch(likeActions.unlikeSuccess(data.like));
    }
  });

  socket.on('followers', (data) => {
    const storeData = store.getState();
    if (data.type === 'new') {
      if (storeData.profile.id === data.friend.id) {
        store.dispatch(userActions.addFollower(data.user));
        sendNotification({
          bigText: `${data.user.displayName} added you`,
          icon: 'person-add',
          title: 'New follower',
          message: `${data.user.displayName} added you`,
          vibration: 300,
          data: { type: 'like', id: data.user.id },
        });
      }
    }
    if (data.type === 'remove') {
      if (storeData.profile.id === data.friend.id) {
        store.dispatch(userActions.removeFollower(data.user));
      }
    }
  });

  socket.on('user_notifications', (data) => {
    const storeData = store.getState();
    if (data.type === 'new') {
      if (storeData.profile.id === data.alert.friendId) {
        store.dispatch(userAlertActions.newAlert({ alert: data.alert }));
      }
    }
  });
};
