import { PropTypes } from 'prop-types';

export default {
  actions: PropTypes.shape({
    loadAllBucketlists: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    saveBucketlist: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    handleHeader: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  allData: PropTypes.shape({
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
    count: PropTypes.number.isRequired,
    nextUrl: PropTypes.string,
    previousUrl: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  components: PropTypes.shape({
    showHeader: PropTypes.bool.isRequired,
  }).isRequired,
};
