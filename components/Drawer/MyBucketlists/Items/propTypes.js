import { PropTypes } from 'prop-types';

export default {
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  bucketlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })),
  }).isRequired,
  previousRoute: PropTypes.string.isRequired,
};
