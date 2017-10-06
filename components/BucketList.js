import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Text,
} from 'react-native';
import BucketListRow from './BucketListRow';

class BucketList extends Component {
  constructor(props, context) {
    super(props, context);
    this.styles = StyleSheet.create({
      container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#f7f7f7',
        justifyContent: 'flex-start',
      },
      button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 1,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        padding: 5,
        color: '#fafafa',
        fontSize: 20,
        fontWeight: '600',
      },
      bucketlistRow: {
        flex: 1,
        alignSelf: 'stretch',
      },
    });
    const data = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: data.cloneWithRows(this.props.screenProps.bucketlists),
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.dataSource = this.state.dataSource.cloneWithRows(
      nextProps.screenProps.bucketlists);
    this.setState = {
      dataSource: this.state.dataSource,
    };
  }

  renderRow(bucketlist) {
    return (
      <BucketListRow
        bucketlist={bucketlist}
        onAddStarted={this.props.screenProps.onAddStarted}
        onDone={this.props.screenProps.onDone}
        style={this.styles.bucketlistRow}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={this.styles.container}>
        <ListView
          key={this.state.bucketlists}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <TouchableHighlight
          onPress={() =>
            navigate('bucketlistform')}
          style={this.styles.button}
        >
          <Text style={this.styles.buttonText}>Add bucketlist</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

BucketList.propTypes = {
  bucketlists: PropTypes.array,
  navigation: PropTypes.object,
  onAddStarted: PropTypes.func,
};

export default BucketList;
