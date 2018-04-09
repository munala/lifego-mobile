import SocketIOClient from 'socket.io-client';
import * as messageActions from '../actions/messageActions';
import * as commentActions from '../actions/commentActions';
import * as likeActions from '../actions/likeActions';
import * as notificationActions from '../actions/notificationActions';
import * as bucketlistActions from '../actions/bucketlistActions';
import * as userActions from '../actions/userActions';
import * as userAlertActions from '../actions/userAlertActions';

export default (store) => {
  const socket = SocketIOClient('https://bucketlist-node.herokuapp.com');
  socket.on('messages', (data) => {
    const storeData = store.getState();
    if (data.type === 'new' && storeData.profile.id === data.message.receiverId) {
      store.dispatch(messageActions.sendMessageSuccess(data.message));
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
    console.log({ data });
    let notify;
    storeData.data.bucketlists.forEach((bucketlist) => {
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
      storeData.data.bucketlists.forEach((bucketlist) => {
        if (data.sourceUserId !== storeData.profile.id && bucketlist.id === data.id) {
          store.dispatch(commentActions.addCommentSuccess({
            id: data.comment.bucketlistId,
          }, data.comment));
        }
      });
      storeData.allData.bucketlists.forEach((bucketlist) => {
        if (data.sourceUserId !== storeData.profile.id && bucketlist.id === data.id) {
          store.dispatch(commentActions.addCommentSuccess({
            id: data.comment.bucketlistId,
          }, data.comment));
        }
      });
    }
    if (data.type === 'update') {
      storeData.data.bucketlists.forEach((bucketlist) => {
        if (data.sourceUserId !== storeData.profile.id && bucketlist.id === data.id) {
          store.dispatch(commentActions.updateCommentSuccess({
            id: data.comment.bucketlistId,
          }, data.comment));
        }
      });
      storeData.allData.bucketlists.forEach((bucketlist) => {
        if (data.sourceUserId !== storeData.profile.id && bucketlist.id === data.id) {
          store.dispatch(commentActions.updateCommentSuccess({
            id: data.comment.bucketlistId,
          }, data.comment));
        }
      });
    }
    if (data.type === 'delete') {
      storeData.data.bucketlists.forEach((bucketlist) => {
        if (data.sourceUserId !== storeData.profile.id && bucketlist.id === data.id) {
          store.dispatch(commentActions.deleteCommentSuccess({
            id: data.comment.bucketlistId,
          }, data.comment));
        }
      });
      storeData.allData.bucketlists.forEach((bucketlist) => {
        if (data.sourceUserId !== storeData.profile.id && bucketlist.id === data.id) {
          store.dispatch(commentActions.deleteCommentSuccess({
            id: data.comment.bucketlistId,
          }, data.comment));
        }
      });
    }
  });

  socket.on('likes', (data) => {
    console.log({ data });
    const storeData = store.getState();
    if (data.type === 'like') {
      storeData.data.bucketlists.forEach((bucketlist) => {
        if (data.like.likerId !== storeData.profile.id &&
          bucketlist.id === data.like.bucketlistId) {
          store.dispatch(likeActions.likeSuccess({
            id: data.like.bucketlistId,
          }, data.like));
        }
      });
      storeData.allData.bucketlists.forEach((bucketlist) => {
        if (data.like.likerId !== storeData.profile.id &&
          bucketlist.id === data.like.bucketlistId) {
          store.dispatch(likeActions.likeSuccess({
            id: data.like.bucketlistId,
          }, data.like));
        }
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
