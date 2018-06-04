import { AsyncStorage } from 'react-native';
import axios from 'axios';
import handleError from './handelError';

const tagsUrl = 'https://bucketlist-node.herokuapp.com/api/tags/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async getTags() {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.get(`${tagsUrl}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async addTag(name) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.post(
      `${tagsUrl}`,
      { name },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
