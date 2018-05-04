import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../../Common/SuperText';
import Header from '../../../Common/Header';
import SearchResults from '../../../Common/SearchResults';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as userActions from '../../../../actions/userActions';
import * as searchActions from '../../../../actions/searchActions';
import * as navigationActions from '../../../../actions/navigationActions';
import Row from '../Row';
import styles from './styles';
import BaseClass from './BaseClass';
import propTypes from './propTypes';

class BucketList extends BaseClass {
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

  renderItem = ({ item }) => ( // eslint-disable-line react/prop-types
    <Row
      onDelete={this.onDelete}
      style={styles.bucketlistRow}
      navigate={this.props.actions.navigate}
      content={item}
      context={this.state.context}
      showModal={this.showModal}
    />
  )

  render() {
    const {
      currentApiCalls,
      bucketlists,
      nextUrl,
      actions: { loadMoreBucketlists, loadBucketlists },
    } = this.props;
    const { length } = bucketlists;
    const page = Math.floor(length / 10);
    const loadMore = bucketlists.length === 10 && nextUrl.length > 0;

    return (
      <View style={styles.container}>
        <Header
          title="My Bucketlists"
          leftIcon="menu"
          onPressLeft={() => this.props.actions.navigate({ route: 'DrawerOpen', navigator: 'DrawerNav' })}
          search={this.search}
          mode="my_bucketlists"
          clearSearch={this.clearSearch}
          onFocus={this.onFocus}
        />
        {
          this.state.searchMode &&
          <SearchResults
            bucketlists={bucketlists}
            onItemPress={bucketlist => this.goToBucketlistForm(bucketlist)}
          />
        }
        {
          bucketlists.length === 0 && currentApiCalls === 0 &&
          <View style={{ display: 'flex' }}>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.empty}>
              No bucketlists to display
              </Text>
            </View>
            <TouchableOpacity style={styles.reload} onPress={loadBucketlists}>
              <Text style={styles.reloadText}>
              Reload
              </Text>
            </TouchableOpacity>
          </View>
        }
        {
          !this.state.searchMode && bucketlists.length > 0 &&
          <FlatList
            keyExtractor={({ id }) => id.toString()}
            data={bucketlists}
            renderItem={this.renderItem}
            style={styles.listView}
            onEndReached={() => (loadMore ? loadMoreBucketlists('my', page * 10) : () => {})}
            onEndReachedThreshold={0.01}
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

BucketList.propTypes = propTypes;

const mapStateToProps = ({
  currentApiCalls: { myBucketlists: currentApiCalls },
  error,
  data: { bucketlists, nextUrl },
}) => ({
  currentApiCalls,
  error,
  bucketlists,
  nextUrl,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...userActions,
    ...searchActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);
