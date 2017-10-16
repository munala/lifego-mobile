import axios from 'axios';

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
  throw Error(error);
};

const BucketlistService = {
  saveBucketlist(bucketlist) {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

    return instance.post(
      bucketlistUrl,
      { name: bucketlist.name },
    )
      .then((response) => {
        if (response.data.message === `${bucketlist.name} already exists`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  addItem(bucketlist, item) {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

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

  deleteBucketlist(bucketlist) {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

    return instance.delete(`${bucketlistUrl + bucketlist.id.toString()}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  getAllBucketlists(offset = 0, limit = 20, name = '') {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

    return instance.get(
      `${bucketlistUrl}?offset=${offset}&limit=${limit}&q=${name}`,
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },

  updateBucketlist(bucketlist) {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

    return instance.put(`${bucketlistUrl + bucketlist.id.toString()}`,
      { name: bucketlist.name },
    )
      .then((response) => {
        if (response.data.message === `${bucketlist.name} is already in use`) {
          return handleError(response.data.message);
        }
        return response.data;
      })
      .catch(error => handleError(error));
  },

  updateItem(bucketlist, item) {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

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

  deleteItem(bucketlist, item) {
    instance.defaults.headers.common.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoib2xpdmVyIiwiZW1haWwiOiJvaXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ5ZTBmNWM0YiQxJGE3ZGZlOThmMTA0MDdkMzQ3ZTAzM2M0NTY0OTIwMTU0YTk5ZGFkN2QiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEwLTAyVDE0OjAwOjI5LjE2OVoiLCJpYXQiOjE1MDgxMzk3ODIsImV4cCI6MTUwODE0MTU4Mn0.CV5-rBnXAaoFrIYYAQgaNEHRLkyyy18A1sMFqVHSFfM';

    return instance.delete(
      `${bucketlistUrl + bucketlist.id}/items/${item.id}`,
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};

export default BucketlistService;
