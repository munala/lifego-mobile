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
import Modal from 'react-native-modal';
import SideMenu from 'react-native-side-menu';
import ActionButton from 'react-native-action-button';
import { Icon, SearchBar } from 'react-native-elements';
import MenuComponent from './SideMenu';
import Row from './Row';
import BucketListForm from './BucketListForm';

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
    this.search = this.search.bind(this);
    this.showModal = this.showModal.bind(this);
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
      },
      bucketlistRow: {
        flex: 1,
        margin: 10,
      },
      image: {
        opacity: 0.8,
        backgroundColor: '#aaa',
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        shadowOpacity: 0,
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
      modal: {
        backgroundColor: 'transparent',
        marginTop: 100,
        position: 'absolute',
        alignSelf: 'center',
        width: '80%',
      },
    });
    this.data = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.rowNumber = 1;
    this.state = {
      dataSource: this.data.cloneWithRows(this.props.screenProps.bucketlists),
      refreshing: true,
      visibleModal: false,
      context: {
        name: 'bucketlist',
      },
      content: null,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.dataSource = this.data.cloneWithRows(
      nextProps.screenProps.bucketlists);
    this.setState({
      dataSource: this.state.dataSource,
      refreshing: false,
    });
  }
  onRefresh() {
    this.rowNumber = 1;
    this.setState({ refreshing: true });
    this.props.screenProps.actions.loadBucketlists(0, 20, '').then(() => {
      this.setState({ refreshing: false });
    });
  }
  showModal(type, content) {
    this.setState({
      visibleModal: type !== 'hide',
      context: {
        ...this.state.context,
        type,
      },
      content,
    });
  }
  search(text) {
    this.state.dataSource = this.data.cloneWithRows(
      this.props.screenProps.bucketlists
        .filter(bucketlist => bucketlist.name.toLowerCase().indexOf(text.toLowerCase()) !== -1));
    this.setState({
      dataSource: this.state.dataSource,
      refreshing: false,
    });
  }

  renderRow(bucketlist) {
    this.rowNumber = this.rowNumber === 1 ? this.rowNumber + 1 : 1;
    return (
      <Row
        onAddStarted={this.props.screenProps.onAddStarted}
        onDone={this.props.screenProps.onDone}
        onDelete={this.props.screenProps.onDelete}
        style={this.styles.bucketlistRow}
        navigation={this.props.navigation}
        content={bucketlist}
        context={this.state.context}
        rowNumber={this.rowNumber}
        showModal={this.showModal}
      />
    );
  }

  render() {
    console.log(this.props.screenProps.actions.logout);
    return (
      <SideMenu
        menu={MenuComponent(this.props.screenProps.actions.logout)}
        isOpen={this.props.screenProps.isOpen}
      >
        <ScrollView
          contentContainerStyle={this.styles.container}
        >
          <Image
            style={this.styles.image}
            source={require('../images/bucketlist_front.jpg')}
            blurRadius={40}
          />
          <Modal
            isVisible={this.state.visibleModal}
            backdropColor={'black'}
            backdropOpacity={0.5}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            style={this.styles.modal}
          >
            <BucketListForm
              context={this.state.context}
              content={this.state.content}
              showModal={this.showModal}
              onSave={this.props.screenProps.onSave}
            />
          </Modal>
          {
            this.props.screenProps.searchMode &&
            <SearchBar
              lightTheme
              round
              clearIcon={{
                backgroundColor: 'rgba(127,127,127,0.5)',
                color: 'rgba(255,255,255,0.5)',
              }}
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
              }}
              inputStyle={{
                backgroundColor: 'rgba(127,127,127,0.5)',
                color: 'rgb(255,255,255)',
              }}
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder="Search"
              icon={{ color: 'rgba(255,255,255,0.5)', name: 'search' }}
              onChangeText={this.search}
            />
          }
          {
            this.state.dataSource.rowIdentities[0].length === 0 &&
            this.props.screenProps.currentApiCalls === 0 &&
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
                refreshing={this.props.screenProps.currentApiCalls > 0}
                onRefresh={this.onRefresh}
                colors={['#05A5D1']}
                tintColor="#fff"
              />
            }
          />
          <ActionButton
            buttonColor="rgba(255,255,255,1)"
            icon={<Icon name="add" color="#00bcd4" />}
            onPress={this.showModal.bind(null, 'Add', null)}
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
