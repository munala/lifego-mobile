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
    searchResults: [],
  },
  bucketlist: {
    name: '',
  },
  currentApiCalls: {
    user: 0,
    allBucketlists: 0,
    myBucketlists: 0,
    notifications: 0,
    messages: 0,
    userAlerts: 0,
    profile: 0,
    settings: 0,
    others: 0,
    loader: 0,
  },
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
