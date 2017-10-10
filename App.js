import React from 'react';
import { Text } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import BucketList from './components/BucketList';
import BucketListForm from './components/BucketListForm';


export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bucketlists: [
        {
          name: '2016',
        },
        {
          name: '2017',
        },
      ],
    };
    this.onAddStarted = this.onAddStarted.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDone = this.onDone.bind(this);
  }
  onAddStarted() {
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
  onAdd(name) {
    this.state.bucketlists.push({ name });
    this.setState({ bucketlists: this.state.bucketlists });
  }
  onDone(doneBucketlist) {
    this.state.bucketlists = this.state.bucketlists
      .filter(bucketlist => bucketlist !== doneBucketlist);
    this.setState({ bucketlists: this.state.bucketlists });
  }
  renderScene(route) {
    switch (route.name) {
      case 'bucketlistform':
        return (
          <BucketListForm
            onCancel={this.onCancel}
            onAdd={this.onAdd}
          />
        );
      default:
        return (
          <BucketList
            onAddStarted={this.onAddStarted}
            onDone={this.onDone}
            bucketlists={this.state.bucketlists}
          />
        );
    }
  }
  render() {
    const RootApp = StackNavigator({
      bucketlist: { screen: BucketList },

      bucketlistform: { screen: BucketListForm,
      },
    });
    return (
      <RootApp
        initialRouteName="bucketist"
        screenProps={{
          bucketlists: this.state.bucketlists,
          onAddStarted: this.onAddStarted,
          onDone: this.onDone,
          onCancel: this.onCancel,
          onAdd: this.onAdd,
        }}
      />
    );
  }
}
