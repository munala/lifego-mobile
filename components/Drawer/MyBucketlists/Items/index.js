import React from 'react';
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
import propTypes from './propTypes';
import BaseClass, { dataSources } from './BaseClass';

class Items extends BaseClass {
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

Items.propTypes = propTypes;

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...bucketlistActions, ...userActions }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Items);
