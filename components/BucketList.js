import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ListView,
  ScrollView,
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bucketlistActions from '../actions/bucketlistActions';
import * as userActions from '../actions/authActions';
import MenuComponent from './SideMenu';
import Row from './Row';
import BucketListForm from './BucketListForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bcd4',
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

const dataSources = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

class BucketList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return ({
      title: 'Bucketlists',
      headerLeft: (
        <Icon
          name="menu"
          color="#00bcd4"
          containerStyle={{ marginLeft: 10 }}
          onPress={state.params ? state.params.toggleSideMenu : () => {}}
        />
      ),
      headerRight: (
        <Icon
          name="search"
          color="#00bcd4"
          containerStyle={{ marginRight: 10 }}
          onPress={state.params ? state.params.toggleSearch : () => {}}
        />
      ),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color: '#00bcd4',
      },
    });
  }

  state = {
    refreshing: true,
    visibleModal: false,
    context: {
      name: 'bucketlist',
    },
    content: {},
    isOpen: false,
    searchMode: false,
    searchText: '',
  };

  componentWillMount = async () => {
    const { actions, navigation, error } = this.props;
    if (error.value) {
      Alert.alert(
        error.value,
        null,
        [
          { text: 'OK', onPress: () => {} },
          { text: 'Retry', onPress: () => actions.loadBucketlists(0, 20, '') },
        ],
      );
    }
    navigation.setParams({
      toggleSearch: this.toggleSearch,
      toggleSideMenu: this.toggleSideMenu,
    });
    actions.loadBucketlists(0, 20, '');
    const status = await AsyncStorage.getItem('new');
    if (!status) {
      Alert.alert('Instructions', 'To access options swipe screen from left to right. \nTo access bucketlist/item options swipe its description from right to left. \nTo view bucketlist items tap on the bucketlist\'s description. \nTo add a bucketlist/item tap on the \'+\' sign at the bottom. Thank you!!');
      AsyncStorage.setItem('new', 'no');
    }
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.actions.loadBucketlists(0, 20, '');
    this.setState({ refreshing: false });
  }

  onSave = (bucketlist, type) => {
    const { actions } = this.props;
    if (type === 'Add') {
      actions.saveBucketlist(bucketlist);
    } else {
      actions.updateBucketlist({ ...bucketlist });
    }
  }

  onDelete = (content) => {
    this.props.actions.deleteBucketlist(content);
  }

  showModal = (type, content = {}) => {
    this.setState({
      visibleModal: type !== 'hide',
      context: {
        ...this.state.context,
        type,
      },
      content,
    });
  }

  search = (text) => {
    this.setState({
      dataSource: dataSources.cloneWithRows(
        this.props.data.bucketlists
          .filter(bucketlist => bucketlist.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)),
      refreshing: false,
      searchText: text,
    });
  }

  toggleSideMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleSearch=() => {
    this.setState({
      searchMode: !this.state.searchMode,
    });
  }

  renderRow = bucketlist => (
    <Row
      onDelete={this.onDelete}
      style={styles.bucketlistRow}
      navigation={this.props.navigation}
      content={bucketlist}
      context={this.state.context}
      showModal={this.showModal}
    />
  )

  render() {
    const { currentApiCalls, error, data, actions, navigation } = this.props;
    const {
      isOpen, visibleModal, content, context, searchMode, searchText,
    } = this.state;
    const bucketlists = data.bucketlists
      .filter(bucketlist => bucketlist.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    return (
      <SideMenu
        menu={
          <MenuComponent
            logout={actions.logout}
            reset={this.toggleSideMenu}
            navigate={navigation.navigate}
          />
        }
        isOpen={isOpen}
      >
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <Modal
            isVisible={visibleModal}
            backdropColor={'black'}
            backdropOpacity={0.5}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            style={styles.modal}
          >
            <BucketListForm
              context={context}
              content={content}
              showModal={this.showModal}
              onSave={this.onSave}
            />
          </Modal>
          {
            searchMode &&
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
            (currentApiCalls === 0 && data.bucketlists.length === 0 && !error.value) ?
              <View style={{ backgroundColor: 'transparent' }}>
                <Text style={styles.empty}>
                  You have no bucketlists
                </Text>
              </View>
              :
              <ListView
                enableEmptySections
                key={data.bucketlists}
                dataSource={dataSources.cloneWithRows(bucketlists)}
                renderRow={this.renderRow}
                style={styles.listView}
                refreshControl={
                  <RefreshControl
                    refreshing={currentApiCalls > 0}
                    onRefresh={this.onRefresh}
                    colors={['#05A5D1']}
                    tintColor="#fff"
                  />
                }
              />
          }
          <ActionButton
            buttonColor="rgba(255,255,255,1)"
            icon={<Icon name="add" color="#00bcd4" />}
            onPress={() => this.showModal('Add')}
          />
        </ScrollView>
      </SideMenu>
    );
  }
}

BucketList.propTypes = {
  data: PropTypes.shape({
    bucketlists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      description: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveBucketlist: PropTypes.func.isRequired,
    updateBucketlist: PropTypes.func.isRequired,
    deleteBucketlist: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...bucketlistActions, ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);
