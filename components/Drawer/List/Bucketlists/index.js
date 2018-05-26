import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

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

  onRefresh = async () => {
    await this.loadBucketlists();
  }

  onSave = async (bucketlist, type, addToCalendar) => {
    const { actions, navigator, screen } = this.props;
    let response;
    if (type === 'Add') {
      response = await actions.saveBucketlist(bucketlist, screen);
    } else {
      response = await actions.updateBucketlist({ ...bucketlist }, screen);
    }
    if (!response.error) {
      actions.navigate({ navigator, route: 'bucketlists' });
      if (addToCalendar === true) {
        const calendars = await RNCalendarEvents.findCalendars();
        const { id } = calendars[calendars.length - 1];
        const date = moment(response.dueDate, 'YYYY-MM-DD').utc().add(1, 'days');
        let status = RNCalendarEvents.authorizationStatus();
        if (status === 'denied' || status === 'undetermined') {
          status = RNCalendarEvents.authorizeEventStore();
        }
        if (status !== 'denied' && status !== 'undetermined') {
          const title = response.name;
          const details = {
            allDay: true,
            location: response.location || 'not specified',
            description: response.description || 'no description',
            startDate: date,
            endDate: date,
            calendarId: id,
          };
          RNCalendarEvents.saveEvent(title, details);
        }
      }
    }
  }

  loadBucketlists = this.props.navigator === 'AllBucketlistNavigator' ? this.props.actions.loadAllBucketlists : this.props.actions.loadBucketlists

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

  goToBucketlist = bucketlist => async () => {
    if (this.state.showMenu) {
      this.closeMenu();
    } else {
      this.props.actions.navigate({
        navigator: this.props.navigator,
        route: this.props.route,
        params: {
          bucketlist,
          route: this.props.route,
          from: this.props.currentRoute,
          navigator: this.props.navigator,
          fromRoute: this.props.fromRoute,
        },
      });
    }
  }

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
        }
        {
          bucketlists.length === 0 && currentApiCalls === 0 &&
          <TouchableOpacity style={styles.reload} onPress={this.loadBucketlists}>
            <Text style={styles.reloadText}>
              Reload
            </Text>
          </TouchableOpacity>
        }
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
