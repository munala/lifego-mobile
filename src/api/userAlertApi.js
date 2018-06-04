import { AsyncStorage } from 'react-native';
import axios from 'axios';
import handleError from './handelError';

const userAlertsUrl = 'https://bucketlist-node.herokuapp.com/api/user_notifications/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async getAlerts() {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.get(`${userAlertsUrl}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async updateAlert(alert) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.put(`${userAlertsUrl}${alert.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async markAsRead(alert) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.put(`${userAlertsUrl}${alert.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async deleteAlert(alert) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.delete(`${userAlertsUrl}${alert.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
