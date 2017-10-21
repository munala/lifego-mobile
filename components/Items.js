import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ListView,
  Switch,
  Text,
  RefreshControl,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import Row from './Row';
import MenuComponent from '../components/SideMenu';

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
      empty: {
        height: 40,
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      },
      bucketlistRow: {
        flex: 1,
        margin: 20,
        opacity: 0,
      },
      listView: {
        marginLeft: 10,
        marginRight: 10,
      },
      toggleRow: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'transparent',
      },
      toggleText: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 3,
        backgroundColor: 'transparent',
        color: '#fff',
      },
      image: {
        opacity: 0.8,
        backgroundColor: '#fff',
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      switch: {
        backgroundColor: 'transparent',
      },
    });
    this.data = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.rowNumber = 0;
    this.state = {
      bucketlist: this.bucketlist,
      dataSource: this.data.cloneWithRows(this.bucketlist.items),
      filter: 'all',
      refreshing: false,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.rowNumber = 0;
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
    this.rowNumber = this.rowNumber === 3 ? 1 : this.rowNumber + 1;
    return (
      <Row
        bucketlist={this.state.bucketlist}
        item={item}
        onDone={this.props.screenProps.onDone}
        onDelete={this.props.screenProps.onDelete}
        style={this.styles.bucketlistRow}
        navigation={this.props.navigation}
        content={item}
        rowNumber={this.rowNumber}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SideMenu menu={MenuComponent(this.props.screenProps.actions.logout)}>
        <ScrollView
          contentContainerStyle={this.styles.container}
        >
          <Image
            style={this.styles.image}
            source={require('../images/bucketlist_front.jpg')}
            blurRadius={10}
          />
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
                style={this.styles.listView}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }
              />
            </ScrollView>
          }
          <ActionButton
            buttonColor="rgba(255,255,255,1)"
            icon={<Icon name="add" color="#00bcd4" />}
            onPress={() =>
              navigate('bucketlistform', {
                context: {
                  name: 'item',
                  type: 'Add',
                  bucketlist: this.props.navigation.state.params.bucketlist,
                },
              })}
          />
        </ScrollView>
      </SideMenu>
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
