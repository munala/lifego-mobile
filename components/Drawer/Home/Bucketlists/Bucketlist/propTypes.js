import { PropTypes } from 'prop-types';

export default {
  params: PropTypes.shape({
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }).isRequired,
  bucketlist: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
