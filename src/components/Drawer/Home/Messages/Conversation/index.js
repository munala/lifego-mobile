import React from 'react';
import { View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';

import ContextMenu from '../../../../Common/ContextMenu';
import Dialog from '../../../../Common/Dialog';
import BaseClass from './BaseClass';
import Text from '../../../../Common/SuperText';
import { setTime } from '../../../../../utils';
import styles from '../../styles';
import propTypes from './propTypes';

class Conversation extends BaseClass {
  state = {
    message: {
      content: '',
    },
    selectedMessage: {},
    editMode: false,
    showMenu: false,
    deleteMode: '',
  }

  componentDidMount = () => {
    if (this.props.conversation) {
      this.props.conversation.messages
        .filter(chatMessage => chatMessage.receiverId === this.props.profile.id)
        .forEach(message => this.props.actions.markAsRead(message));
    }
    if (this.scrollView) {
      this.scrollView.scrollToEnd({ animated: true });
    }
  }

  componentDidUpdate = ({
    conversation,
    params: { newConversation },
    actions: { navigate },
  }) => {
    if (!conversation && !newConversation && !this.state.message.content) {
      navigate({
        route: 'MessageList',
        navigator: 'MessageNavigator',
      });
    }
  }

  selectMessage = (selectedMessage) => {
    this.openMenu();
    this.setState({ selectedMessage });
  }

  renderMessages = messages => messages.map((chatMessage) => {
    const { createdAt, time } = setTime(chatMessage);
    const { profile } = this.props;
    const dateTime = `- ${createdAt}${time} -`;

    return (
      <TouchableOpacity
        key={chatMessage.id}
        onLongPress={() => (
          chatMessage.senderId === profile.id ?
            this.openMenu(chatMessage) :
            () => {}
        )}
        delayLongPress={500}
        activeOpacity={1}
      >
        <Text
          style={[this.setStyle(chatMessage, profile), styles.message]}
        >
          {chatMessage.content}
        </Text>
        <Text
          style={styles.timeSent}
        >
          {dateTime}
        </Text>
      </TouchableOpacity>
    );
  })

  render() {
    const {
      conversation,
      params: { newConversation, id },
    } = this.props;
    const { message, showMenu, showDialog, deleteMode } = this.state;
    let name;
    let userId;

    const items = [
      { label: 'Edit', action: this.editMessage },
      { label: 'Delete', action: this.deleteMessage },
    ];

    const dialogProps = {
      text: `Delete ${deleteMode}? This action cannot be undone.`,
      buttons: [{
        label: 'Delete',
        action: this.delete,
      }],
      cancelable: true,
      onCancel: this.closeDialog,
    };

    if (conversation || newConversation) {
      name = this.getName(conversation || newConversation);
      userId = this.getId(conversation || newConversation);
    }

    if (!conversation && !newConversation) {
      return (<View style={styles.container} />);
    }

    return (
      <TouchableWithoutFeedback onPress={this.closeMenu} style={styles.touchArea}>
        <View style={[styles.container, { backgroundColor: '#fff' }]}>
          <View style={styles.top}>
            <Icon
              style={styles.backButton}
              onPress={this.goBack}
              name="chevron-left"
              color="#00bcd4"
              size={30}
            />
            <TouchableOpacity onPress={() => this.goToProfile({ id: userId })}>
              <Text style={styles.name} numberOfLines={1}>{name}</Text>
            </TouchableOpacity>
            <Icon
              style={styles.deleteButton}
              onPress={conversation ? () => this.deleteConversation({ id }) : this.goBack}
              name="delete"
              color="red"
              size={24}
            />
          </View>
          <View style={styles.bodyWrapper}>
            <ScrollView
              contentContainerStyle={styles.body}
              ref={(ref) => { this.scrollView = ref; }}
              onContentSizeChange={() => this.scrollView.scrollToEnd()}
            >
              {conversation && this.renderMessages(conversation.messages)}
            </ScrollView>
          </View>
          <View style={styles.newMessage}>
            <TextInput
              placeholder="type message"
              underlineColorAndroid="#00bcd4"
              style={styles.inputStyles}
              value={message.content}
              onChangeText={this.onChange}
              onKeyPress={({ key }) => {
                if (key === 'Enter') {
                  this.saveMessage();
                }
              }}
            />
            <Icon
              style={styles.newButton}
              onPress={this.saveMessage}
              name="send"
              color="#00bcd4"
            />
          </View>
          {
            this.state.editMode &&
            <TouchableOpacity onPress={this.cancel} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          }
          {
            showMenu && <ContextMenu items={items} />
          }
          {
            showDialog && <Dialog {...dialogProps} />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Conversation.propTypes = propTypes;

export default Conversation;
