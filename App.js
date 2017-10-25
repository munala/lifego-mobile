import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
  Alert,
  AlertIOS,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import * as bucketlistActions from './actions/bucketlistActions';
import * as userActions from './actions/authActions';
import BucketList from './components/BucketList';
import Items from './components/Items';
import BucketListForm from './components/BucketListForm';
import UserForm from './components/UserForm';


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ...this.props,
      isLoading: this.props.currentApiCalls > 0,
      isOpen: false,
      searchMode: false,
    };
    this.initialRouteName = null;
    this.onSave = this.onSave.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setInitialRoute = this.setInitialRoute.bind(this);
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.props.actions.checkToken();
    this.setInitialRoute(this.props);
    this.styles = {
      activity: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.auth.loggedIn !== nextProps.auth.loggedIn) {
      this.setInitialRoute(nextProps);
    }
    if (nextProps.error.value) {
      (Platform.OS === 'ios' ? AlertIOS : Alert).alert(nextProps.error.value);
    }
    this.setState({
      isLoading: nextProps.currentApiCalls > 0,
    });
  }
  onSave(content, context) {
    if (context.name === 'bucketlist') {
      if (context.type === 'Add') {
        this.props.actions.saveBucketlist(content);
      } else {
        this.props.actions.updateBucketlist(content);
      }
    } else if (context.name === 'item') {
      if (context.type === 'Add') {
        this.props.actions.saveItem(context.bucketlist, content);
      } else {
        this.props.actions.updateItem(context.bucketlist, content);
      }
    }
  }
  onDelete(content, context) {
    if (context.name === 'bucketlist') {
      this.props.actions.deleteBucketlist(content);
    } else if (context.name === 'item') {
      this.props.actions.deleteItem(context.bucketlist, content);
    }
  }
  onDone(bucketlist, item) {
    const newItem = { ...item, done: !item.done };
    this.props.actions.updateItem(bucketlist, newItem);
  }
  onSubmit(user, registerMode) {
    if (registerMode) {
      this.props.actions.register(user);
    } else {
      this.props.actions.login(user);
    }
  }
  setInitialRoute(props) {
    const stack = {
      user: {
        screen: UserForm,
        navigationOptions: () => ({
          title: 'Login',
          header: null,
        }),
      },
      bucketlist: {
        screen: BucketList,
        navigationOptions: () => ({
          title: 'Bucketlists',
          headerLeft: (
            <Icon
              name="menu"
              color="#00bcd4"
              containerStyle={{ marginLeft: 10 }}
              onPress={this.toggleSideMenu}
            />
          ),
          headerRight: (
            <Icon
              name="search"
              color="#00bcd4"
              containerStyle={{ marginRight: 10 }}
              onPress={this.toggleSearch}
            />
          ),
        }),
      },
      items: {
        screen: Items,
        navigationOptions: ({ navigation }) => ({
          title: navigation.state.params.bucketlist.name,
          headerLeft: (
            <Icon
              name="chevron-left"
              color="#00bcd4"
              size={40}
              containerStyle={{ marginLeft: 10 }}
              onPress={() => { navigation.goBack(); }}
            />
          ),
          headerRight: (
            <Icon
              name="search"
              color="#00bcd4"
              containerStyle={{ marginRight: 10 }}
              onPress={this.toggleSearch}
            />
          ),
        }),
      },
      bucketlistform: {
        screen: BucketListForm,
        navigationOptions: ({ navigation }) => ({
          title: `${navigation.state.params.context.type} ${navigation.state.params.context.name}`,
          headerRight: (<View />),
        }),
      },
    };
    if (props.auth.loggedIn) {
      delete stack.user;
    }
    this.RootApp = StackNavigator(stack, {
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          color: '#00bcd4',
        },
      },
    });
  }
  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  toggleSearch() {
    this.setState({
      searchMode: !this.state.searchMode,
    });
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={this.styles.activity}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // }
    return (
      <this.RootApp
        screenProps={{
          bucketlists: this.props.data.bucketlists,
          loggedIn: this.props.auth.loggedIn,
          token: this.props.auth.token,
          onDone: this.onDone,
          onDelete: this.onDelete,
          onSave: this.onSave,
          onSubmit: this.onSubmit,
          actions: this.props.actions,
          isOpen: this.state.isOpen,
          searchMode: this.state.searchMode,
          toggleSideMenu: this.toggleSideMenu,
        }}
      />
    );
  }
}
App.propTypes = {
  actions: PropTypes.object,
  auth: PropTypes.object,
  error: PropTypes.object,
  currentApiCalls: PropTypes.number,
  data: PropTypes.object,
};
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...bucketlistActions, ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
