import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  Alert,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../../Common/Header';
import SearchResults from '../../../Common/SearchResults';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as userActions from '../../../../actions/userActions';
import * as searchActions from '../../../../actions/searchActions';
import Row from '../Row';
import styles from './styles';

const dataSources = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

class BucketList extends Component {
  static navigationOptions = {
    drawerLabel: 'My bucketlists',
    drawerIcon: (
      <Icon
        name="list"
        color="#00bcd4"
      />
    ),
  }

  state = {
    visibleModal: false,
    context: {
      name: 'bucketlist',
    },
    content: {},
    isOpen: false,
    searchMode: false,
  };

  componentWillMount = async () => {
    const { actions, error } = this.props;
    actions.loadBucketlists(0, 20, '');
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.props.actions.logout();
        this.props.navigation.navigate('user');
      } else {
        Alert.alert(
          error,
          null,
          [
            { text: 'OK', onPress: () => {} },
            { text: 'Retry', onPress: () => actions.loadBucketlists(0, 20, '') },
          ],
        );
      }
    }
  }

  componentWillReceiveProps = async ({ error }) => {
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    }
  }

  onRefresh = () => {
    this.props.actions.loadBucketlists(0, 20, '');
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

  handleResults=(text) => {
    this.setState({
      searchMode: !!text,
    });
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

  search = (text) => {
    if (text) {
      this.props.actions.search(text);
      this.setState({
        searchMode: true,
      });
    } else {
      this.clearSearch();
    }
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
    this.props.actions.clearSearch();
  }

  logout = () => {
    const { actions, nav: navigate } = this.props;
    actions.logout();
    navigate('user');
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
    const {
      currentApiCalls,
      error,
      data: { bucketlists },
      navigation: { navigate },
      nav,
      navi,
      actions,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="My Bucketlists"
          leftIcon="menu"
          onPressLeft={() => nav.navigate('DrawerOpen')}
          search={this.search}
          mode="my_bucketlists"
          clearSearch={this.clearSearch}
          logout={actions.logout}
          navigate={navi}
          handleResults={this.handleResults}
        />
        {
          this.state.searchMode &&
          <SearchResults
            bucketlists={bucketlists}
            onItemPress={bucketlist => navigate('items', {
              bucketlist,
            })}
          />
        }
        {
          !this.state.searchMode && bucketlists.length === 0 && currentApiCalls === 0 && !error &&
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.empty}>
              you have no bucketlists
            </Text>
          </View>
        }
        {
          !this.state.searchMode && bucketlists.length > 0 && !error &&
          <ListView
            enableEmptySections
            key={bucketlists}
            dataSource={dataSources.cloneWithRows(bucketlists)}
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
        }
        <ActionButton
          size={40}
          fixNativeFeedbackRadius
          buttonColor="#00bcd4"
          icon={<Icon name="add" color="#fff" />}
          onPress={() => this.showModal('Add')}
        />
      </View>
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
    search: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
  nav: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navi: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...bucketlistActions,
      ...userActions,
      ...searchActions,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);
