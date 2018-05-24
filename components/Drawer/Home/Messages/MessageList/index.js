/* eslint-disable global-require */
import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseClass from './BaseClass';
import * as messageActions from '../../../../../actions/messageActions';
import * as userActions from '../../../../../actions/userActions';
import * as navigationActions from '../../../../../actions/navigationActions';
import Text from '../../../../Common/SuperText';
import Dialog from '../../../../Common/Dialog';
import ContextMenu from '../../../../Common/ContextMenu';
import styles from '../../styles';
import propTypes from './propTypes';

class MessageList extends BaseClass {
  renderItem = ({ item: conversation }) => { // eslint-disable-line react/prop-types
    const unread = this.getUnreadCount(conversation);
    const pictureUrl = this.setPictureUrl(conversation);
    return (
      <TouchableOpacity
        style={styles.notificationView}
        key={conversation.id}
        onPress={() => this.goToConversation(conversation)}
        onLongPress={() => this.openMenu(conversation)}
        delayLongPress={500}
        activeOpacity={1}
      >
        <View style={styles.notification}>
          <Image
            style={styles.avatar}
            source={
              pictureUrl ?
                {
                  uri: (
                    pictureUrl.replace(
                      (pictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
                      'https://',
                    )
                  ),
                } :
                require('../../../../../assets/images/user.png')
            }
          />
          <View style={styles.preview}>
            <Text style={[styles.notificationText, {
              color: conversation.read ? 'grey' : '#009baf',
            }]}
            >
              { this.getName(conversation) }
            </Text>
            {
              conversation.messages.length > 0 &&
              <Text style={[styles.wordWrap, unread > 0 && { fontWeight: 'bold' }]}>
                {this.truncateMessage(conversation.messages[0].content)}
              </Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderResults = () => (
    <View style={styles.renderResults}>
      <ScrollView>
        <List containerStyle={styles.results}>
          {this.props.profile.friends
            .filter(friend => friend.displayName && friend.displayName.toLowerCase()
              .indexOf(this.state.searchText.toLowerCase()) !== -1)
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
        <View style={styles.container}>
          {this.state.searching &&
          <TextInput
            style={styles.searchInput}
            value={this.state.searchText}
            onChangeText={this.onChange}
            underlineColorAndroid="#f7f7f7"
            placeholderTextColor="#f7f7f7"
            placeholder="Search friends"
          />
          }
          {this.state.searching && this.renderResults()}
          <TouchableOpacity
            style={[styles.read, styles.compose]}
            onPress={() => this.toggleNew()}
          >
            <Text style={styles.notificationActionText}>{this.state.searching ? 'Cancel' : 'Compose'}</Text>
          </TouchableOpacity>
          {!this.state.searching && conversations.length > 0 &&
          <FlatList
            enableEmptySections
            keyExtractor={({ id }) => id.toString()}
            data={conversations}
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
            !this.state.searching &&
          (this.props.conversations.length > 0 ?
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.read}
                onPress={this.markAllAsRead}
              >
                <Text style={styles.notificationActionText}>mark all as read</Text>
              </TouchableOpacity>
            </View> :
            <View style={styles.none}>
              <Text style={styles.noneText}>{'you\'re all caught up'}</Text>
            </View>)
          }
          {
            this.state.showMenu && <ContextMenu items={items} />
          }
          {
            this.state.showDialog && <Dialog {...dialogProps} />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

MessageList.propTypes = propTypes;

const mapStateToProps = ({
  profile, conversations, currentApiCalls: { messages: currentApiCalls },
}, ownProps) => ({
  profile,
  conversations,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
