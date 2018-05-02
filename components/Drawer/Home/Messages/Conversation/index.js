import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseClass from './BaseClass';
import * as messageActions from '../../../../../actions/messageActions';
import * as userActions from '../../../../../actions/userActions';
import * as navigationActions from '../../../../../actions/navigationActions';
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

  componentDidUpdate = ({ conversation, params: { newConversation }, actions: { navigate } }) => {
    if (!conversation && !newConversation && !this.state.message.content) {
      navigate({ route: 'MessageList', navigator: 'MessageNavigator' });
    }
  }

  selectMessage = (selectedMessage) => {
    this.setState({ selectedMessage });
  }

  renderMessages = messages => messages.map((chatMessage) => {
    const { createdAt, time } = setTime(chatMessage);
    const { selectedMessage } = this.state;
    const { profile } = this.props;
    const dateTime = `- ${createdAt}${time} -`;

    return (
      <TouchableOpacity
        key={chatMessage.id}
        onLongPress={() => (
          chatMessage.senderId === profile.id ?
            this.selectMessage(chatMessage) :
            () => {}
        )}
        delayLongPress={500}
      >
        <Text
          style={[this.setStyle(chatMessage, profile), styles.message]}
        >
          {chatMessage.content}
        </Text>
        {selectedMessage.senderId === profile.id &&
          selectedMessage.id === chatMessage.id &&
          <Icon
            containerStyle={styles.deleteButton}
            onPress={() => this.deleteMessage(chatMessage)}
            name="delete"
            color="red"
            size={16}
          />
        }
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
    const { message } = this.state;
    let name;
    let userId;

    if (conversation || newConversation) {
      name = this.getName(conversation || newConversation);
      userId = this.getId(conversation || newConversation);
    }
    if (!conversation && !newConversation) {
      return (<View style={styles.container} />);
    }

    return (
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
            <Text style={styles.name}>{name}</Text>
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
            autoFocus
            placeholder="type message"
            underlineColorAndroid="#00bcd4"
            style={styles.inputStyles}
            value={message.content}
            onChangeText={this.onChange}
            onKeyPress={({ key }) => {
              if (key === 'Enter') {
                this.onSubmit();
              }
            }}
          />
          <Icon
            style={styles.newButton}
            onPress={this.onSubmit}
            name="send"
            color="#00bcd4"
          />
        </View>
      </View>
    );
  }
}

Conversation.propTypes = propTypes;

const mapStateToProps = ({
  profile,
  conversations,
}, { navigation: { state } }) => {
  let param = {};
  let conversation;
  if (state && state.params) {
    const { params, params: { id } } = state;
    param = params;
    conversation = conversations.filter(chat => chat.id === id)[0];
  }
  return ({
    params: param,
    profile,
    conversation,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
