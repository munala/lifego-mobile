import React from 'react';
import {
  FlatList,
  Alert,
  View,
  RefreshControl,
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

  componentWillMount = async () => {
    const { actions, error } = this.props;
    actions.loadBucketlists(0, 20, '');
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
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

  renderItem = ({ item }) => ( // eslint-disable-line react/prop-types
    <Row
      onDelete={this.onDelete}
      style={styles.bucketlistRow}
      navigate={this.props.actions.navigate}
      setParams={this.props.actions.setParams}
      content={item}
      context={this.state.context}
      showModal={this.showModal}
    />
  )

  render() {
    const {
      currentApiCalls,
      error,
      data: { bucketlists },
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="My Bucketlists"
          leftIcon="menu"
          onPressLeft={() => this.props.navigation.navigate('DrawerOpen')}
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
          !this.state.searchMode && bucketlists.length === 0 && currentApiCalls === 0 && !error &&
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.empty}>
              you have no bucketlists
            </Text>
          </View>
        }
        {
          !this.state.searchMode && bucketlists.length > 0 && !error &&
          <FlatList
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

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...bucketlistActions,
      ...userActions,
      ...searchActions,
      ...navigationActions,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);
