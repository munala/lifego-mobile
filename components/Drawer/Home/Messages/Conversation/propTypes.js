import { PropTypes } from 'prop-types';

export default {
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
  }).isRequired,
  conversation: PropTypes.shape({
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  actions: PropTypes.shape({
    sendMessage: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired,
    deleteConversation: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequire,
  }).isRequired,
};
