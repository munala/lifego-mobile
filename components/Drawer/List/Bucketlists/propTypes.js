import { PropTypes } from 'prop-types';

export default {
  actions: PropTypes.shape({
    loadAllBucketlists: PropTypes.func.isRequired,
    loadMoreBucketlists: PropTypes.func.isRequired,
    saveBucketlist: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    bucketlists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        done: PropTypes.bool,
      })),
      comments: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        id: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      })),
    })),
    nextUrl: PropTypes.string,
    previousUrl: PropTypes.string,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
};
