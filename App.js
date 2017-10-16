import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StackNavigator,
} from 'react-navigation';
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
    this.state = this.props;
    this.state.initialRouteName = null;
    this.onSaveStarted = this.onSaveStarted.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.RootApp = StackNavigator({
      user: {
        screen: UserForm,
        navigationOptions: () => ({
          title: 'Login',
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
        }),
      },
      bucketlistform: {
        screen: BucketListForm,
        navigationOptions: ({ navigation }) => ({
          title: `${navigation.state.params.context.type} ${navigation.state.params.context.name}`,
        }),
      },
    }, {
    });
  }
  componentWillReceiveProps(nextProps) {
    this.state = nextProps;
  }
  onSaveStarted() {
    this.nav.push({
      name: 'bucketlistform',
    });
  }
  onCancel() {
    this.nav.pop();
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
  renderScene(route) {
    switch (route.name) {
      case 'bucketlistform':
        return (
          <BucketListForm
            onCancel={this.onCancel}
            onSave={this.onSave}
          />
        );
      default:
        return (
          <BucketList
            onSaveStarted={this.onSaveStarted}
            onDone={this.onDone}
            onDelete={this.onDelete}
            bucketlists={this.state.bucketlists}
          />
        );
    }
  }
  render() {
    return (
      <this.RootApp
        screenProps={{
          bucketlists: this.state.data.bucketlists,
          onSaveStarted: this.onSaveStarted,
          loggedIn: this.state.auth.loggedIn,
          token: this.state.auth.token,
          onDone: this.onDone,
          onDelete: this.onDelete,
          onCancel: this.onCancel,
          onSave: this.onSave,
          onSubmit: this.onSubmit,
          actions: this.props.actions,
        }}
      />
    );
  }
}
App.propTypes = {
  actions: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    data: state.data,
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...bucketlistActions, ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
