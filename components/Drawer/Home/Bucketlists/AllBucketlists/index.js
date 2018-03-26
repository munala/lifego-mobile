import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../../../Common/SuperText';
import * as bucketlistActions from '../../../../../actions/bucketlistActions';
import * as userActions from '../../../../../actions/userActions';
import * as commentActions from '../../../../../actions/commentActions';
import * as likeActions from '../../../../../actions/likeActions';
import * as tagActions from '../../../../../actions/tagActions';
import { handleHeader } from '../../../../../actions/componentActions';
import SingleCard from '../SingleCard/SingleCard';
import styles from '../../styles';
import propTypes from './propTypes';
import BaseClass from './BaseClass';

class AllBucketlists extends BaseClass {
  state = {
    visibleModal: false,
    context: {
      name: 'bucketlist',
    },
    content: {},
    isOpen: false,
    searchText: '',
    searchMode: false,
    bucketlist: {
      id: '',
      name: '',
      description: '',
      category: '',
      location: '',
      tags: '',
    },
    comment: {
      id: '',
      content: '',
    },
    open: false,
    showComments: false,
    tagText: '',
    page: 0,
    imageHeights: {},
  };

  componentWillMount = async () => {
    const { error, allData: { bucketlists } } = this.props;
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    } else {
      this.getImageHeights(bucketlists);
    }
  }

  componentWillReceiveProps = async ({ allData: { bucketlists }, error }) => {
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    } else
    if (bucketlists.length !== this.props.allData.bucketlists.length) {
      this.getImageHeights(bucketlists);
    }
  }

  toggleComments = async (bucketlist) => {
    if (this.state.bucketlist.id !== bucketlist.id) {
      this.selectBucketlist(bucketlist);
      this.setState({
        showComments: true,
      });
    } else {
      this.setState({
        showComments: !this.state.showComments,
      });
    }
  }

  showModal = async (type, content = {}) => {
    this.props.navigation.navigate('bucketlistForm', {
      context: {
        ...this.state.context,
        type,
      },
      content,
      onSave: this.onSave,
    });
  }

  offset = 0

  renderItem = ({ item }) => { // eslint-disable-line react/prop-types
    const { createdAt, time } = this.setTime(item);
    const bucketlistProps = {
      bucketlist: item,
      createdAt,
      time,
      openModal: this.openModal,
      setTime: this.setTime,
      setGrid: this.setGrid,
      setLikeColor: this.setLikeColor,
      percentWidth: this.state.percentWidth,
      toggleComments: this.toggleComments,
      showComments: this.state.showComments,
      comm: this.state.comment,
      bucketList: this.state.bucketlist,
      selectBucketlist: this.selectBucketlist,
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      like: this.like,
      profile: this.props.profile,
      push: this.props.navigation.navigate,
      imageHeights: this.state.imageHeights,
    };
    bucketlistProps.goToBucketlist = () => this.props.navigation.navigate('bucketlist', {
      id: item.id,
    });
    return (
      <SingleCard {...bucketlistProps} />
    );
  }

  render() {
    const {
      currentApiCalls,
      allData,
    } = this.props;
    const { searchText } = this.state;
    const bucketlists = allData.bucketlists
      .filter(bucketlist => bucketlist.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    return (
      <View style={styles.container}>
        {
          allData.bucketlists.length === 0 && currentApiCalls === 0 ?
            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
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

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...userActions,
    ...commentActions,
    ...likeActions,
    ...tagActions,
    handleHeader,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBucketlists);
