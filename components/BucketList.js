import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Text,
} from 'react-native';
import Row from './Row';

class BucketList extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.screenProps.actions.loadBucketlists(0, 20, '');
    this.navigate = this.props.navigation.navigate;
    this.styles = StyleSheet.create({
      container: {
        paddingTop: 10,
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
    this.data = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: this.data.cloneWithRows(this.props.screenProps.bucketlists),
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.dataSource = this.data.cloneWithRows(
      nextProps.screenProps.bucketlists);
    this.setState = {
      dataSource: this.state.dataSource,
    };
  }

  renderRow(bucketlist) {
    return (
      <Row
        bucketlist={bucketlist}
        onAddStarted={this.props.screenProps.onAddStarted}
        onDone={this.props.screenProps.onDone}
        onDelete={this.props.screenProps.onDelete}
        style={this.styles.bucketlistRow}
        navigation={this.props.navigation}
      />

    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={this.styles.container}>
        <ListView
          enableEmptySections
          key={this.state.bucketlists}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <TouchableHighlight
          onPress={() =>
            this.navigate('bucketlistform', {
              context: {
                name: 'bucketlist',
                type: 'Add',
              },
            })}
          style={this.styles.button}
        >
          <Text style={this.styles.buttonText}>Add bucketlist</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

BucketList.propTypes = {
  bucketlists: PropTypes.array,
  navigation: PropTypes.object,
  onAddStarted: PropTypes.func,
};

export default BucketList;
