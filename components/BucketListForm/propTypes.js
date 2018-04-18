import PropTypes from 'prop-types';

export default {
  propTypes: {
    params: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      onSave: PropTypes.func,
      content: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        pictureUrl: PropTypes.string,
      }),
      context: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired,
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
