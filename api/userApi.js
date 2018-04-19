import { AsyncStorage } from 'react-native';
import axios from 'axios';

const userUrl = 'https://bucketlist-node.herokuapp.com/api/user/';
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const handleError = error => ({
  error: error.response ? error.response.data.message : error.message,
});

export default {
  loginUser(uSer) {
    const {
      confirm, displayName, ...user
    } = uSer;
    return instance.post(
      `${userUrl}login`,
      { ...user },
    )
      .then(response => response.data.token)
      .catch(error => handleError(error));
  },
  socialLogin(user) {
    return instance.post(
      `${userUrl}social_login`,
      { ...user },
    )
      .then(response => response.data.token)
      .catch(error => handleError(error));
  },
  registerUser(user) {
    return instance.post(
      `${userUrl}register`,
      { ...user },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  resetPassword(email) {
    return instance.post(
      `${userUrl}reset_password`,
      { email },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async changePassword(user) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.post(
      `${userUrl}change_password`,
      { ...user },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async changeEmail(user) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.post(
      `${userUrl}change_email`,
      { ...user },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async changeUsername(user) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.post(
      `${userUrl}change_username`,
      { ...user },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async getProfile() {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.get(`${userUrl}get_profile`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async getOtherProfile(id) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.get(`${userUrl}get_other_profile/${id}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async updateProfile(prof) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    const {
      friends, searchUsers, followers, ...profile
    } = prof;
    return instance.post(
      `${userUrl}update_profile`,
      { ...profile },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async searchUsers(name) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.get(`${userUrl}users?name=${name}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async addFriend(friend) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.post(`${userUrl}add_friend`, { ...friend })
      .then(response => response.data)
      .catch(error => handleError(error));
  },
  async removeFriend(friend) {
    instance.defaults.headers.common.token = await AsyncStorage.getItem('token');
    return instance.delete(`${userUrl}remove_friend/${friend.id}`)
      .then(response => response.data)
      .catch(error => handleError(error));
  },
};
