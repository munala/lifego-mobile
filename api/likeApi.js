import { AsyncStorage } from 'react-native';
import axios from 'axios';
import handleError from './handelError';

const likesUrl = 'https://bucketlist-node.herokuapp.com/api/likes/';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  async like(bucketlist) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.post(
      `${likesUrl}`,
      { bucketlistId: bucketlist.id },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async unlike(like) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.delete(`${likesUrl}${like.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
