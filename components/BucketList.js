import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ListView,
  ScrollView,
  Image,
  Alert,
  Text,
  View,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import MenuComponent from '../components/SideMenu';
import Row from './Row';

class BucketList extends Component {
  constructor(props, context) {
    super(props, context);
    AsyncStorage.getItem('new').then((status) => {
      if (!status) {
        Alert.alert('Instructions', 'To access options swipe screen from left to right. \nTo access bucketlist/item options swipe its description from right to left. \nTo view bucketlist items tap on the bucketlist\'s description. \nTo add a bucketlist/item tap on the \'+\' sign at the bottom. Thank you!!');
        AsyncStorage.setItem('new', 'no');
      }
    });
    this.props.screenProps.actions.loadBucketlists(0, 20, '');
    this.navigate = this.props.navigation.navigate;
    this.onRefresh = this.onRefresh.bind(this);
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
      },
      bucketlistRow: {
        flex: 1,
        margin: 10,
        opacity: 0,
      },
      listView: {
        marginLeft: 10,
        marginRight: 10,
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
      empty: {
        height: 40,
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      },
    });
    this.data = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.rowNumber = 0;
    this.state = {
      dataSource: this.data.cloneWithRows(this.props.screenProps.bucketlists),
      refreshing: false,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.rowNumber = 0;
    this.state.dataSource = this.data.cloneWithRows(
      nextProps.screenProps.bucketlists);
    this.setState({
      dataSource: this.state.dataSource,
    });
  }
  onRefresh() {
    this.setState({ refreshing: true });
    this.props.screenProps.actions.loadBucketlists(0, 20, '').then(() => {
      this.setState({ refreshing: false });
    });
  }

  renderRow(bucketlist) {
    this.rowNumber = this.rowNumber === 3 ? 1 : this.rowNumber + 1;
    return (
      <Row
        bucketlist={bucketlist}
        onAddStarted={this.props.screenProps.onAddStarted}
        onDone={this.props.screenProps.onDone}
        onDelete={this.props.screenProps.onDelete}
        style={this.styles.bucketlistRow}
        navigation={this.props.navigation}
        rowNumber={this.rowNumber}
      />
    );
  }

  render() {
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
          {
            this.state.dataSource.rowIdentities[0].length === 0 &&
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={this.styles.empty}>
                You have no bucketlists
              </Text>
            </View>
          }
          <ListView
            enableEmptySections
            key={this.state.bucketlists}
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
          <ActionButton
            buttonColor="rgba(255,255,255,1)"
            icon={<Icon name="add" color="#00bcd4" />}
            onPress={() =>
              this.navigate('bucketlistform', {
                context: {
                  name: 'bucketlist',
                  type: 'Add',
                },
              })}
          />
        </ScrollView>
      </SideMenu>
    );
  }
}

BucketList.propTypes = {
  bucketlists: PropTypes.array,
  navigation: PropTypes.object,
  onAddStarted: PropTypes.func,
  screenProps: PropTypes.object,
};

export default BucketList;
