import { PropTypes } from 'prop-types';

export default {
  data: PropTypes.shape({
    bucketlists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      description: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    myBucketlists: PropTypes.shape({
      previousRoute: PropTypes.string.isRequired,
      params: PropTypes.shape({
        bucketlist: PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          updatedAt: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            done: PropTypes.bool.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
};
