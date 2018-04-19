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
    pictureUrl: '',
    displayName: '',
    email: '',
    searchUsers: [],
    friends: [],
    followers: [],
  },
  otherProfile: {
    pictureUrl: '',
    displayName: '',
    email: '',
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
  navigationData: {
    auth: {
      previousRoute: '',
      route: 'splash',
      params: {},
    },
    drawer: {
      previousRoute: '',
      route: 'Home',
      params: {},
    },
    home: {
      previousRoute: '',
      route: 'Home',
      params: {},
    },
    allBucketlists: {
      previousRoute: '',
      route: 'bucketlists',
      params: {},
    },
    myBucketlists: {
      previousRoute: '',
      route: 'bucketlist',
      params: {},
    },
    conversations: {
      previousRoute: '',
      route: 'MessageList',
      params: {},
    },
    profile: {
      previousRoute: '',
      route: 'MessageList',
      params: {},
    },
  },
};
