import React, { Component } from 'react';
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

import Text from '../../../../Common/SuperText';
import * as bucketlistActions from '../../../../../actions/bucketlistActions';
import * as userActions from '../../../../../actions/userActions';
import * as navigationActions from '../../../../../actions/navigationActions';
import SingleCard from '../SingleCard';
import styles from '../../styles';
import propTypes from './propTypes';

class AllBucketlists extends Component {
  state = {
    visibleModal: false,
    context: {
      name: 'bucketlist',
    },
    content: {},
    isOpen: false,
    searchText: '',
    searchMode: false,
    open: false,
    tagText: '',
    page: 0,
  };

  onRefresh = async () => {
    await this.props.actions.loadAllBucketlists();
  }

  onSave = async (bucketlist, type) => {
    const { actions } = this.props;
    if (type === 'Add') {
      await actions.saveBucketlist(bucketlist, 'allBucketlists');
    } else {
      await actions.updateBucketlist({ ...bucketlist }, 'allBucketlists');
    }
    actions.navigate({ navigator: 'AllBucketlistNavigator', route: 'bucketlists' });
  }

  openModal = () => {
    this.setState({
      bucketlist: {
        id: '',
        name: '',
        description: '',
        category: '',
        tags: '',
        location: '',
      },
      open: true,
      gallery: [],
    });
  }

  logout = () => this.props.actions.logout();

  goToBucketlist = item => async () => {
    this.props.actions.navigate({ navigator: 'AllBucketlistNavigator',
      route: 'bucketlist',
      params: {
        id: item.id,
        from: 'bucketlists',
      },
    });
  }

  showModal = async (type, content = {}) => {
    this.props.actions.navigate({
      navigator: 'AllBucketlistNavigator',
      route: 'bucketlistForm',
      params: {
        context: {
          ...this.state.context,
          type,
        },
        content,
        onSave: this.onSave,
        goBack: () => this.props.actions.navigate({ navigator: 'AllBucketlistNavigator', route: 'bucketlists' }),
      },
    });
  }

  renderItem = ({ item }) => { // eslint-disable-line react/prop-types
    const bucketlistProps = {
      bucketlist: item,
      goToBucketlist: this.goToBucketlist(item),
    };
    return (
      <SingleCard {...bucketlistProps} />
    );
  }

  render() {
    const {
      currentApiCalls: { allBucketlists: currentApiCalls },
      allData: { bucketlists, nextUrl },
      actions: { loadMoreBucketlists, loadAllBucketlists },
    } = this.props;
    const { length } = bucketlists;
    const page = Math.floor(length / 10) + 1;
    const loadMore = bucketlists.length === 10 && nextUrl.length > 0;
    return (
      <View style={styles.container}>
        {
          bucketlists.length === 0 && currentApiCalls === 0 ?
            <View style={{ display: 'flex' }}>
              <Text style={styles.empty}>
                No bucketlists to display
              </Text>
            </View> :
            <FlatList
              enableEmptySections
              keyExtractor={({ id }) => id.toString()}
              data={bucketlists}
              renderItem={this.renderItem}
              style={styles.listView}
              onEndReached={loadMore ? (() => loadMoreBucketlists('all', page * 10)) : (() => {})}
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
        {
          bucketlists.length === 0 && currentApiCalls === 0 &&
          <TouchableOpacity style={styles.reload} onPress={loadAllBucketlists}>
            <Text style={styles.reloadText}>
              Reload
            </Text>
          </TouchableOpacity>
        }
        <ActionButton
          size={40}
          buttonColor="#00bcd4"
          fixNativeFeedbackRadius
          icon={<Icon name="add" color="#fff" />}
          onPress={() => this.showModal('Add')}
        />
      </View>
    );
  }
}

AllBucketlists.propTypes = propTypes;

const mapStateToProps = ({
  currentApiCalls: { allBucketlists: currentApiCalls }, allData,
}) => ({ currentApiCalls, allData });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBucketlists);
