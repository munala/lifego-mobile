import axios from 'axios';
import { AsyncStorage } from 'react-native';

const bucketlistUrl =
  'https://bucketlist-node.herokuapp.com/api/bucketlists/';
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    throw new Error('Unauthorised');
  }
  if (error.response && error.response.status === 409) {
    throw new Error(error.response.data.message);
  }
  if (error.message === 'Network Error') {
    throw new Error('Failed to connect to the internet. Check your internet settings.');
  }
  throw Error(error);
};

const BucketlistService = {
  saveBucketlist(bucketlist) {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.post(
        bucketlistUrl,
        { name: bucketlist.name, description: bucketlist.description },
      )
        .then((response) => {
          if (response.data.message === `${bucketlist.name} already exists`) {
            return handleError(response.data.message);
          }
          return response.data;
        })
        .catch(error => handleError(error));
    });
  },

  addItem(bucketlist, item) {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.post(
        `${bucketlistUrl + bucketlist.id.toString()}/items/`,
        { name: item.name, description: item.description },
      )
        .then((response) => {
          if (response.data.message === `${item.name} already exists`) {
            return handleError(response.data.message);
          }
          return response.data;
        })
        .catch(error => handleError(error));
    });
  },

  deleteBucketlist(bucketlist) {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.delete(`${bucketlistUrl + bucketlist.id.toString()}`)
        .then(response => response.data)
        .catch(error => handleError(error));
    });
  },

  getAllBucketlists(offset = 0, limit = 20, name = '') {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.get(
        `${bucketlistUrl}?offset=${offset}&limit=${limit}&q=${name}`,
      )
        .then(response => response.data)
        .catch(error => handleError(error));
    });
  },

  updateBucketlist(bucketlist) {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.put(`${bucketlistUrl + bucketlist.id.toString()}`,
        { name: bucketlist.name, description: bucketlist.description },
      )
        .then((response) => {
          if (response.data.message === `${bucketlist.name} is already in use`) {
            return handleError(response.data.message);
          }
          return response.data;
        })
        .catch(error => handleError(error));
    });
  },

  updateItem(bucketlist, item) {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.put(
        `${bucketlistUrl + bucketlist.id}/items/${item.id}`,
        {
          name: item.name,
          description: item.description,
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
    });
  },

  deleteItem(bucketlist, item) {
    return AsyncStorage.getItem('token').then((token) => {
      instance.defaults.headers.common.token = token;
      return instance.delete(
        `${bucketlistUrl + bucketlist.id}/items/${item.id}`,
      )
        .then(response => response.data)
        .catch(error => handleError(error));
    });
  },
};

export default BucketlistService;
