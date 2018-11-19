import { removeEmptyFields } from '../utils';
import sendRequest, { sendGraphQLRequest } from '../utils/api';
import { responseMessageFields, profileFields, userFields } from './fields';

const userUrl = 'https://api.lifegokenya.com/api/auth/';

export default {
  loginUser: async (uSer) => {
    const { confirm, displayName, ...user } = uSer;

    return sendRequest({
      method: 'post',
      url: `${userUrl}login`,
      data: removeEmptyFields(user),
    });
  },

  registerUser: async user => sendRequest({
    method: 'post',
    url: `${userUrl}register`,
    data: removeEmptyFields(user),
  }),

  resetPassword: async email => sendRequest({
    method: 'post',
    url: `${userUrl}reset_password`,
    data: { email },
  }),

  changePassword: async data => sendRequest({
    method: 'post',
    url: `${userUrl}change_password`,
    data: removeEmptyFields(data),
  }),

  changeEmail: async data => sendRequest({
    method: 'post',
    url: `${userUrl}change_email`,
    data: removeEmptyFields(data),
  }),

  changeUsername: async user => sendRequest({
    method: 'post',
    url: `${userUrl}change_username`,
    data: removeEmptyFields(user),
  }),

  deleteAccount: async ({ email, password }) => {
    const queryData = {
      args: {
        email,
        password,
      },
      mutation: 'deleteAccount',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },

  getProfile: async () => {
    const queryData = {
      mutation: 'getProfile',
      fields: profileFields,
    };

    return sendGraphQLRequest(queryData);
  },

  getOtherProfile: async (id) => {
    const args = { id };

    const queryData = {
      args,
      mutation: 'getOtherProfile',
      fields: profileFields,
    };

    return sendGraphQLRequest(queryData);
  },

  updateProfile: async ({
    displayName,
    pictureUrl,
    privacy,
    reminders,
  }) => {
    const args = removeEmptyFields({
      displayName,
      pictureUrl,
      privacy,
      reminders,
    });

    const queryData = {
      args,
      mutation: 'updateProfile',
      fields: profileFields,
    };

    return sendGraphQLRequest(queryData);
  },

  addFriend: async (friend) => {
    const queryData = {
      args: { id: friend.id },
      mutation: 'addFriend',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },

  removeFriend: async (friend) => {
    const queryData = {
      args: { id: friend.id },
      mutation: 'removeFriend',
      fields: responseMessageFields,
    };

    return sendGraphQLRequest(queryData);
  },

  searchUsers: async (name) => {
    const queryData = {
      args: { name },
      mutation: 'searchUsers',
      fields: userFields,
    };

    return sendGraphQLRequest(queryData);
  },

};
