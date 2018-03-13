import { PropTypes } from 'prop-types';

export default {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    socialLogin: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
};
