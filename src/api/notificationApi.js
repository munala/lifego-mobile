import { AsyncStorage } from 'react-native';
import axios from 'axios';
import handleError from './handelError';

const notificationsUrl = 'https://bucketlist-node.herokuapp.com/api/notifications/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async getNotifications() {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.get(`${notificationsUrl}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async updateNotification(notification) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.put(`${notificationsUrl}${notification.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async markAsRead(notification) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.put(`${notificationsUrl}${notification.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async deleteNotification(notification) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.delete(`${notificationsUrl}${notification.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
