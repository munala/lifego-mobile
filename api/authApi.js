import axios from 'axios';

const authUrl = 'https://bucketlist-node.herokuapp.com/api/auth/';
const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const handleError = error => ({
  error: error.response ? error.response.data.message : error.message,
});

const UserService = {
  loginUser(user) {
    return instance.post(`${authUrl}login`,
      {
        username: user.username,
        password: user.password,
      },
    )
      .then(response => response.data.token)
      .catch(error => handleError(error));
  },
  registerUser(user) {
    return instance.post(`${authUrl}register`,
      {
        username: user.username,
        email: user.email,
        password: user.password,
        confirm: user.confirm,
        social: user.social,
      },
    )
      .then(response => response.data)
      .catch(error => handleError(error));
  },

};

export default UserService;
