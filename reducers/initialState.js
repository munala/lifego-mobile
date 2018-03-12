export default {
  data: {
    bucketlists: [],
    nextUrl: '',
    previousUrl: '',
  },
  allData: {
    bucketlists: [],
    nextUrl: '',
    previousUrl: '',
    newBucketlists: [],
    count: 0,
  },
  bucketlist: {
    name: '',
  },
  currentApiCalls: 0,
  loggedIn: false,
  error: '',
  message: '',
  searchText: '',
  profile: {
    searchUsers: [],
    friends: [],
    followers: [],
  },
  conversations: [],
  notifications: [],
  alerts: [],
  tags: [],
  components: {
    showHeader: true,
  },
};
