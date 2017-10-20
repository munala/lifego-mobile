import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Switch,
  TouchableHighlight,
  Text,
  RefreshControl,
} from 'react-native';
import Row from './Row';

class Items extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.bucketlist = { ...this.props.navigation.state.params.bucketlist };
    this.bucketlist.items = this.bucketlist.items ? this.bucketlist.items : [];
    this.onRefresh = this.onRefresh.bind(this);
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
      bucketlist: this.bucketlist,
      dataSource: this.data.cloneWithRows(this.bucketlist.items),
      filter: 'all',
      refreshing: false,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const bucketlist = nextProps.bucketlists
      .filter(bucket => bucket.id === this.state.bucketlist.id)[0];
    bucketlist.items = bucketlist.items ? bucketlist.items : [];
    this.state.dataSource = this.data.cloneWithRows(bucketlist.items);
    this.setState({
      bucketlist,
      dataSource: this.state.dataSource,
    });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.screenProps.actions.loadBucketlists(0, 20, '').then(() => {
      this.setState({ refreshing: false });
    });
  }

  toggleFilter() {
    const filter = this.state.filter === 'all' ? 'pending' : 'all';
    this.setState({
      filter,
      dataSource: this.data.cloneWithRows(this.state.bucketlist.items
        .filter(item => (filter === 'all' || (filter === 'pending' && !item.done)))),
    });
  }

  renderRow(item) {
    return (
      <Row
        bucketlist={this.state.bucketlist}
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
      <ScrollView
        contentContainerStyle={this.styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={this.styles.toggleRow}>
          <Switch
            style={this.styles.switch}
            value={this.state.filter === 'pending'}
            onValueChange={this.toggleFilter}
          />
          <Text
            style={this.styles.toggleText}
          >Showing {this.state.filter} items</Text>
        </View>
        {
          (!this.props.navigation.state.params.bucketlist.items
            || (
              this.props.navigation.state.params.bucketlist.items
              && this.props.navigation.state.params.bucketlist.items.length === 0
            )
          )
          &&
          <View>
            <Text style={[this.styles.buttonText, this.styles.empty]}>
              You have no items
            </Text>
          </View>
        }
        {
          this.props.navigation.state.params.bucketlist.items &&
          <ScrollView>
            <ListView
              enableEmptySections
              key={this.state.items}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />

          </ScrollView>
        }
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
      </ScrollView>
    );
  }
}

Items.propTypes = {
  bucketlists: PropTypes.array,
  navigation: PropTypes.object,
  screenProps: PropTypes.object,
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return { bucketlists: state.data.bucketlists };
}

export default connect(mapStateToProps)(Items);
