import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  ListView,
  Switch,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';

import Header from '../../../Common/Header';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as userActions from '../../../../actions/userActions';
import Row from '../Row';
import styles from './styles';

const dataSources = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

class Items extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return ({
      title: state.params ? state.params.bucketlist.name : '',
      headerLeft: (
        <Icon
          name="chevron-left"
          color="#00bcd4"
          size={40}
          containerStyle={{ marginLeft: 10 }}
          onPress={() => { navigation.goBack(); }}
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
  };

  state = {
    bucketlist: this.props.navigation.state.params.bucketlist,
    dataSource: dataSources.cloneWithRows(this.props.navigation.state.params.bucketlist.items),
    filter: 'all',
    refreshing: false,
    visibleModal: false,
    context: {
      name: 'item',
    },
    content: null,
    searchMode: false,
    isOpen: false,
  };

  componentWillReceiveProps = (nextProps) => {
    const [bucketlist] = [...nextProps.data.bucketlists
      .filter(bucket => bucket.id === this.state.bucketlist.id)];
    this.setState({
      bucketlist,
      dataSource: dataSources.cloneWithRows(bucketlist.items),
    });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.actions.loadBucketlists(0, 20, '');
    this.setState({ refreshing: false });
  }

  onDelete = (content) => {
    this.props.actions.deleteItem(this.state.bucketlist, content);
  }

  onDone = (item) => {
    const newItem = { ...item, done: !item.done };
    this.props.actions.updateItem(this.state.bucketlist, newItem);
  }

  onSave = (item = {}, type) => {
    const { actions } = this.props;
    const { bucketlist } = this.state;
    if (type === 'Add') {
      actions.saveItem(bucketlist, item);
    } else {
      actions.updateItem(bucketlist, { ...item });
    }
  }

  showModal = (type, content = {}) => {
    this.props.navigation.navigate('bucketlistForm', {
      context: {
        ...this.state.context,
        type,
      },
      content,
      onSave: this.onSave,
    });
  }

  toggleFilter = () => {
    const filter = this.state.filter === 'all' ? 'pending' : 'all';
    this.setState({
      filter,
      dataSource: dataSources.cloneWithRows(this.state.bucketlist.items
        .filter(item => (filter === 'all' || (filter === 'pending' && !item.done)))),
    });
  }

  renderRow = item => (
    <Row
      onDone={this.onDone}
      onDelete={this.onDelete}
      style={styles.bucketlistRow}
      navigation={this.props.navigation}
      content={item}
      context={this.state.context}
      showModal={this.showModal}
    />
  )

  render() {
    const {
      filter, dataSource, bucketlist,
    } = this.state;
    const { currentApiCalls, navigation: { goBack } } = this.props;
    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title={bucketlist.name}
          leftIcon={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
          onPressLeft={() => goBack()}
          search={() => {}}
          mode="items"
          clearSearch={() => {}}
          logout={() => {}}
          navigate={() => {}}
        />
        <ScrollView
          contentContainerStyle={styles.container}
        >
          {(!bucketlist.items || bucketlist.items.length > 0) &&
            <View style={styles.toggleRow}>

              <Switch
                style={styles.switch}
                value={filter === 'pending'}
                onValueChange={this.toggleFilter}
              />
              <Text
                style={styles.toggleText}
              >Showing {filter} items</Text>
            </View>
          }
          {
            bucketlist.items &&
            bucketlist.items.length === 0 &&
            <View>
              <Text style={[styles.buttonText, styles.empty]}>
                no items on this bucketlist
              </Text>
            </View>
          }
          {
            bucketlist.items &&
            <ScrollView>
              <ListView
                enableEmptySections
                key={bucketlist.items}
                dataSource={dataSource}
                renderRow={this.renderRow}
                style={styles.listView}
                refreshControl={
                  <RefreshControl
                    refreshing={currentApiCalls > 0}
                    onRefresh={this.onRefresh}
                    colors={['#00bcd4']}
                    tintColor="#eee"
                  />
                }
              />
            </ScrollView>
          }
          <ActionButton
            size={40}
            fixNativeFeedbackRadius
            buttonColor="#00bcd4"
            icon={<Icon name="add" color="#fff" />}
            onPress={() => this.showModal('Add')}
          />
        </ScrollView>
      </View>
    );
  }
}

Items.propTypes = {
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
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        bucketlist: PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          updatedAt: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            done: PropTypes.bool.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...bucketlistActions, ...userActions }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Items);
