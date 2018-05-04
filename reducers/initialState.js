import * as navigation from './navigationInitialState';

const { navigationData } = navigation;

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
  ...navigationData,
  authNavigator: {
    routeName: 'splash',
  },
};
