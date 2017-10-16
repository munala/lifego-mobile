import React from 'react';
import { Text } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import * as types from './actions/actionTypes';
import * as bucketlistActions from './actions/bucketlistActions';
import BucketList from './components/BucketList';
import Items from './components/Items';
import BucketListForm from './components/BucketListForm';

const store = bucketlistActions.getStore();

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = store.getState().data;
    store.subscribe(() => {
      this.setState(store.getState().data);
    });
    bucketlistActions.loadBucketlists(0, 20, '');
    this.onSaveStarted = this.onSaveStarted.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.RootApp = StackNavigator({
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
    });
  }
  onSaveStarted() {
    this.nav.push({
      name: 'bucketlistform',
    });
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }
  onCancel() {
    this.nav.pop();
  }
  onSave(content, context) {
    if (context.name === 'bucketlist') {
      if (context.type === 'Add') {
        bucketlistActions.saveBucketlist(content);
      } else {
        bucketlistActions.updateBucketlist(content);
      }
    } else if (context.name === 'item') {
      if (context.type === 'Add') {
        bucketlistActions.saveItem(context.bucketlist, content);
      } else {
        bucketlistActions.updateItem(context.bucketlist, content);
      }
    }
  }
  onDelete(bucketlist, item, context) {
    if (context.name === 'bucketlist') {
      bucketlistActions.deleteBucketlist(bucketlist);
    } else if (context.name === 'item') {
      bucketlistActions.deleteItem(bucketlist, item);
    }
  }
  onDone(bucketlist, item) {
    const newItem = { ...item, done: !item.done };
    bucketlistActions.updateItem(bucketlist, newItem);
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
        initialRouteName="bucketist"
        screenProps={{
          bucketlists: this.state.bucketlists,
          onSaveStarted: this.onSaveStarted,
          onDone: this.onDone,
          onDelete: this.onDelete,
          onCancel: this.onCancel,
          onSave: this.onSave,
        }}
      />
    );
  }
}
