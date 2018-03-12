import { AsyncStorage } from 'react-native';
import axios from 'axios';
import handleError from './handelError';

const bucketlistUrl = 'https://bucketlist-node.herokuapp.com/api/bucketlists/';
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const BucketlistService = {
  async saveBucketlist(bucketlist) {
    const { id, ...bucketList } = bucketlist;
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.post(
      bucketlistUrl,
      { ...bucketList },
    )
      .then((response) => {
        if (response.data.message === `${bucketlist.name} already exists`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  async addItem(bucketlist, item) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.post(
      `${bucketlistUrl + bucketlist.id.toString()}/items/`,
      { name: item.name },
    )
      .then((response) => {
        if (response.data.message === `${item.name} already exists`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },
  async deleteBucketlist(bucketlist) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.delete(`${bucketlistUrl + bucketlist.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async getBucketlists(offset, limit, name) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.get(`${bucketlistUrl}?offset=${offset}&limit=${limit}&q=${name}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async getAllBucketlists(offset, limit, name) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.get(`${bucketlistUrl}all/?offset=${offset}&limit=${limit}&q=${name}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  async updateBucketlist(bucketlist) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.put(
      `${bucketlistUrl + bucketlist.id.toString()}`,
      {
        ...bucketlist,
      },
    )
      .then((response) => {
        if (response.data.message === `${bucketlist.name} is already in use`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  async updateItem(bucketlist, item) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.put(
      `${bucketlistUrl + bucketlist.id}/items/${item.id}`,
      {
        name: item.name,
        done: item.done,
      },
    )
      .then((response) => {
        if (response.data.message === `${item.name} is already in use`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  async deleteItem(bucketlist, item) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');

    return instance.delete(`${bucketlistUrl + bucketlist.id}/items/${item.id}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};

export default BucketlistService;
