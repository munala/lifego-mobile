import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
  TouchableHighlight,
  Text,
  Alert,
  AlertIOS,
  Platform,
  View,
} from 'react-native';
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
    this.state = { ...this.props, isOpen: false };
    this.state.initialRouteName = null;
    this.onSave = this.onSave.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setInitialRoute = this.setInitialRoute.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.props.actions.checkToken();
    this.setInitialRoute(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.auth.loggedIn !== nextProps.auth.loggedIn) {
      this.setInitialRoute(nextProps);
    }
    if (nextProps.error.value) {
      (Platform.OS === 'ios' ? AlertIOS : Alert).alert(nextProps.error.value);
    }
    this.setState(nextProps);
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
  onDelete(bucketlist, item, context) {
    if (context.name === 'bucketlist') {
      this.props.actions.deleteBucketlist(bucketlist);
    } else if (context.name === 'item') {
      this.props.actions.deleteItem(bucketlist, item);
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
        }),
      },
      items: {
        screen: Items,
        navigationOptions: ({ navigation }) => ({
          title: navigation.state.params.bucketlist.name,
          headerRight: (<View />),
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
        },
      },
    });
  }
  render() {
    return (
      <this.RootApp
        screenProps={{
          bucketlists: this.state.data.bucketlists,
          loggedIn: this.state.auth.loggedIn,
          token: this.state.auth.token,
          onDone: this.onDone,
          onDelete: this.onDelete,
          onSave: this.onSave,
          onSubmit: this.onSubmit,
          actions: this.props.actions,
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
