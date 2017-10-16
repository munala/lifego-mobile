import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ListView,
  Switch,
  TouchableHighlight,
  Text,
} from 'react-native';
import Row from './Row';

class BucketList extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.bucketlist = this.props.navigation.state.params.bucketlist;
    this.bucketlist.items = this.bucketlist.items ? this.bucketlist.items : [];
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
      empty: {
        height: 40,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#aaa',
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
      toggleRow: {
        flexDirection: 'row',
        padding: 10,
      },
      toggleText: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 3,
      },
    });
    this.data = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: this.data.cloneWithRows(this.bucketlist.items),
      filter: 'all',
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.bucketlist = nextProps.navigation.state.params.bucketlist;
    this.bucketlist.items = this.bucketlist.items ? this.bucketlist.items : [];
    this.state.dataSource = this.data.cloneWithRows(
      nextProps.navigation.state.params.bucketlist.items);
    this.setState = {
      dataSource: this.state.dataSource,
    };
  }

  toggleFilter(filter) {
    this.setState({
      filter,
      dataSource: this.data.cloneWithRows(this.bucketlist.items.filter(item => (filter === 'all' || (filter === 'pending' && !item.done)))) });
  }

  renderRow(item) {
    return (
      <Row
        item={item}
        onDone={this.props.screenProps.onDone}
        onDelete={this.props.screenProps.onDelete}
        style={this.styles.bucketlistRow}
        navigation={this.props.navigation}
        content={item}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={this.styles.container}>
        <View style={this.styles.toggleRow}>
          <Switch
            style={this.styles.switch}
            value={this.state.filter === 'pending'}
            onValueChange={() => this.toggleFilter(this.state.filter === 'all' ? 'pending' : 'all')}
          />
          <Text
            style={this.styles.toggleText}
          >
                  Showing {this.state.filter} bucketlists ({this.bucketlist.items.filter(item => (this.state.filter === 'all' || (this.state.filter === 'pending' && !item.done))).length})
          </Text>
        </View>
        {
          this.props.navigation.state.params.bucketlist.items.length === 0 &&
          <View>
            <Text style={[this.styles.buttonText, this.styles.empty]}>You have no items</Text>
          </View>
        }
        {
          this.props.navigation.state.params.bucketlist.items &&
          <View>
            <ListView
              key={this.state.items}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
            <TouchableHighlight
              onPress={() =>
                navigate('bucketlistform', {
                  context: {
                    name: 'item',
                    type: 'Add',
                    bucketlist: this.props.navigation.state.params.bucketlist,
                  },
                })}
              style={this.styles.button}
            >
              <Text style={this.styles.buttonText}>Add item</Text>
            </TouchableHighlight>
          </View>
        }

      </View>
    );
  }
}

BucketList.propTypes = {
  items: PropTypes.array,
  navigation: PropTypes.object,
  onAddStarted: PropTypes.func,
  screenProps: PropTypes.object,
};

export default BucketList;
