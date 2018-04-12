import { PropTypes } from 'prop-types';

export default {
  currentApiCalls: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    socialLogin: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
