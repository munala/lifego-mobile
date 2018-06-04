import PropTypes from 'prop-types';

export default {
  propTypes: {
    context: PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
    }),
    content: PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string,
    }),
  },
  defaultProps: {
    content: {
      description: '',
      name: '',
      pictureUrl: null,
    },
    context: {
      type: 'Add',
      name: '',
    },
  },
};
