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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveBucketlist: PropTypes.func.isRequired,
    updateBucketlist: PropTypes.func.isRequired,
    deleteBucketlist: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
  drawerNavigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigateTopStack: PropTypes.func.isRequired,
};
