import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  FlatList,
  Switch,
  RefreshControl,
  Platform,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';

import Text from '../../../Common/SuperText';
import Header from '../../../Common/Header';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as userActions from '../../../../actions/userActions';
import * as navigationActions from '../../../../actions/navigationActions';
import Row from '../Row';
import styles from './styles';
import propTypes from './propTypes';
import BaseClass from './BaseClass';

class Items extends BaseClass {
  state = {
    bucketlist: this.props.navigationData.myBucketlists.params.bucketlist,
    data: this.props.navigationData.myBucketlists.params.bucketlist.items,
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
      data: bucketlist.items,
    });
  }

  renderItem = ({ item }) => ( // eslint-disable-line react/prop-types
    <Row
      onDone={this.onDone}
      onDelete={this.onDelete}
      style={styles.bucketlistRow}
      content={item}
      context={this.state.context}
      showModal={this.showModal}
    />
  )

  render() {
    const {
      filter, data, bucketlist,
    } = this.state;
    const {
      currentApiCalls,
      navigationData: { myBucketlists: { previousRoute } },
      actions: { navigate },
    } = this.props;
    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title={bucketlist.name}
          leftIcon={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
          onPressLeft={() => navigate({ route: previousRoute, navigator: 'myBucketlists' })}
          search={() => {}}
          mode="items"
          clearSearch={() => {}}
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
              >
                Showing {filter} items
              </Text>
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
              <FlatList
                keyExtractor={({ id }) => id.toString()}
                data={data}
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

Items.propTypes = propTypes;

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...bucketlistActions,
      ...userActions,
      ...navigationActions,
    }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Items);
