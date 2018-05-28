import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContextMenu from '../../../Common/ContextMenu';
import Dialog from '../../../Common/Dialog';
import BaseClass from '../CommonClass';
import Text from '../../../Common/SuperText';
import Loader from '../../../Common/SmallLoader';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as userActions from '../../../../actions/userActions';
import * as navigationActions from '../../../../actions/navigationActions';
import { filterExpired } from '../../../../utils';
import SingleCard from '../SingleCard';
import styles from '../../Home/styles';
import propTypes from './propTypes';

class AllBucketlists extends BaseClass {
  state = {
    visibleModal: false,
    context: {
      name: 'bucketlist',
    },
    selectedBucketlist: {},
    content: {},
    isOpen: false,
    searchText: '',
    searchMode: false,
    open: false,
    tagText: '',
    page: 0,
  };

  componentDidMount = async () => {
    const newUser = await AsyncStorage.getItem('new_user');
    if (newUser) {
      await await AsyncStorage.removeItem('new_user');
      this.showModal('Add');
    } else {
      const hideExpired = await AsyncStorage.getItem('expired');
      this.setState({ hideExpired });
      this.setItems([
        { label: 'Edit', action: this.editBucketlist },
        { label: 'Delete', action: this.deleteBucketlist },
      ]);
      this.setButtons([{
        label: 'Delete',
        action: this.delete,
      }]);
    }
  }

  renderEmptyArea = ({ item: {
    id: currentApiCalls,
  } }) => currentApiCalls === 0 && ( // eslint-disable-line react/prop-types
    <View style={{ display: 'flex', marginTop: '30%' }}>
      <Icon
        name="bucket"
        type="entypo"
        color="#fff"
        size={100}
      />
      <Text style={{ display: 'flex', textAlign: 'center', fontSize: 20, color: '#fff', marginTop: 20 }}>
        {"No bucketlists to display. \nClick on the '+' icon at the bottom right to add a bucketlist. \nOr pull down to refresh."}
      </Text>
    </View>
  );

  renderItem = ({ item }) => { // eslint-disable-line react/prop-types
    const bucketlistProps = {
      bucketlist: item,
      goToBucketlist: this.goToBucketlist(item),
      navigator: this.props.navigator,
      setItems: this.setItems,
      setButtons: this.setButtons,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
      openDialog: this.openDialog,
      closeDialog: this.closeDialog,
      showMenu: this.state.showMenu,
      currentRoute: 'bucketlists',
      fromRoute: this.props.fromRoute,
    };
    return (
      <SingleCard {...bucketlistProps} />
    );
  }

  render() {
    const {
      currentApiCalls,
      loaderCalls,
      screen,
      data: { bucketlists: bucketLists, nextUrl },
      actions: { loadMoreBucketlists },
    } = this.props;
    const bucketlists = this.state.hideExpired ? filterExpired(bucketLists) : bucketLists;
    const { length } = bucketlists;
    const offset = (Math.ceil(length / 10)) * 10;
    const loadMore = bucketlists.length === 10 && nextUrl.length > 0;
    const items = this.state.items;
    const buttons = this.state.buttons;
    const dialogProps = {
      text: 'Are you sure? This action cannot be undone.',
      buttons,
      cancelable: true,
      onCancel: this.closeDialog,
    };


    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={({ id }) => id.toString()}
          data={bucketlists.length > 0 ? bucketlists : [{ id: currentApiCalls }]}
          renderItem={bucketlists.length > 0 ? this.renderItem : this.renderEmptyArea}
          style={styles.listView}
          onEndReached={
            loadMore ? (() => loadMoreBucketlists(screen, offset)) : (() => {})
          }
          onEndReachedThreshold={0.01}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              refreshing={currentApiCalls > 0}
              onRefresh={this.onRefresh}
              colors={['#00bcd4']}
              tintColor="#eee"
            />
          }
        />
        {loaderCalls > 0 && <Loader /> }
        {
          this.state.showMenu && <ContextMenu items={items} />
        }
        {
          this.state.showDialog && <Dialog {...dialogProps} />
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
  currentApiCalls: calls, allData, data: myData, profile,
}, { screen }) => {
  const currentApiCalls = calls[screen];
  const loaderCalls = calls.loader;
  const data = screen === 'allBucketlists' ? allData : myData;
  return ({ currentApiCalls, data, loaderCalls, profile });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBucketlists);
