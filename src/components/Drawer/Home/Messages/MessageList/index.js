/* eslint-disable global-require */
import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
  ScrollView,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import BaseClass from './BaseClass';
import Text from '../../../../Common/SuperText';
import Dialog from '../../../../Common/Dialog';
import ContextMenu from '../../../../Common/ContextMenu';
import ConversationRow from './ConversationRow';
import styles from '../../styles';
import propTypes from './propTypes';

class Conversations extends BaseClass {
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.actions.navigate({
        navigator: 'HomeTabNav',
        route: 'HomeBucketlists',
      });
      return true;
    });
  }

  sortConversations = conversations => [...conversations]
    .sort((a, b) => new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt))

  renderItem = ({ item: conversation }) => { // eslint-disable-line react/prop-types
    const unread = this.getUnreadCount(conversation);
    const pictureUrl = this.setPictureUrl(conversation);

    return (
      <ConversationRow
        conversation={conversation}
        pictureUrl={pictureUrl}
        unread={unread}
        goToConversation={this.goToConversation}
        openMenu={this.openMenu}
        getName={this.getName}
        profile={this.props.profile}
      />
    );
  }

  renderResults = () => (
    <View style={styles.renderResults}>
      <ScrollView>
        <List containerStyle={styles.results}>
          {this.props.profile.friends
            .filter(friend => friend.displayName && friend.displayName.toLowerCase()
              .includes(this.state.searchText.toLowerCase()))
            .map(person => (
              <ListItem
                key={person.id}
                avatar={person.pictureUrl ?
                  { uri: person.pictureUrl.replace('http://', 'https://') } :
                  require('../../../../../assets/images/user.png')}
                roundAvatar
                title={person.displayName}
                containerStyle={styles.resultContainerStyle}
                wrapperStyle={styles.resultWrapperStyle}
                titleStyle={styles.personTitle}
                onPress={() => this.startChat(person)}
                hideChevron
              />
            ))
          }
        </List>
      </ScrollView>
    </View>
  )

  render() {
    const { conversations, currentApiCalls } = this.props;

    const items = [
      { label: 'Delete', action: () => this.deleteConversation(this.state.conversation) },
      { label: 'Mark as read', action: () => this.markAsRead(this.state.conversation) },
    ];

    const dialogProps = {
      text: 'Delete conversation? This action cannot be undone.',
      buttons: [{
        label: 'Delete',
        action: this.delete,
      }],
      cancelable: true,
      onCancel: this.closeDialog,
    };

    return (
      <TouchableWithoutFeedback onPress={this.closeMenu} style={styles.touchArea}>
        <View style={[styles.container, { backgroundColor: '#fff' }]}>
          {
            this.state.searching &&
            <TextInput
              style={styles.searchInput}
              value={this.state.searchText}
              onChangeText={this.onChange}
              underlineColorAndroid="#eee"
              placeholderTextColor="#ccc"
              placeholder="Search friends"
            />
          }
          {this.state.searching && this.renderResults()}
          {
            this.state.searching &&
            <TouchableOpacity
              style={[styles.read, styles.compose]}
              onPress={this.toggleNew}
            >
              <Text style={styles.notificationActionText}>
                Cancel
              </Text>
            </TouchableOpacity>
          }
          {
            !this.state.searching && conversations.length > 0 &&
            <FlatList
              enableEmptySections
              keyExtractor={({ id }) => id.toString()}
              data={this.sortConversations(conversations)}
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
          {
            !this.state.searching && (this.props.conversations.length > 0 ?
              <View style={styles.options}>
                <TouchableOpacity
                  style={styles.read}
                  onPress={this.markAllAsRead}
                >
                  <Text style={styles.notificationActionText}>Mark all as read</Text>
                </TouchableOpacity>
              </View> :
              <View style={styles.none}>
                <Text style={styles.noneText}>Messages come here</Text>
              </View>)
          }
          {this.state.showMenu && <ContextMenu items={items} />}
          {this.state.showDialog && <Dialog {...dialogProps} />}
          {
            !this.state.searching &&
            <ActionButton
              size={40}
              buttonColor="#00bcd4"
              fixNativeFeedbackRadius
              icon={
                <Icon
                  name="add"
                  color="#fff"
                />
              }
              onPress={this.toggleNew}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Conversations.propTypes = propTypes;

export default Conversations;
