import { PropTypes } from 'prop-types';

export default {
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  otherProfile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  actions: PropTypes.shape({
    getProfile: PropTypes.func.isRequired,
    getOtherProfile: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
