import { Component } from 'react';
import { Alert } from 'react-native';

import propTypes from './propTypes';

class BaseClass extends Component {
  state = {
    message: {
      content: '',
    },
  }

  onChange = (content) => {
    this.setState({
      message: { ...this.state.message, content },
    });
  }

  onSubmit = async () => {
    let conversation;
    const { message } = this.state;
    const { params, conversation: currentConversation } = this.props;
    if (!currentConversation) {
      conversation = await this.props.actions
        .startConversation(params.newConversation);
      await this.props.actions.setParams({
        params: { id: conversation.id },
        navigator: 'conversations',
      });
    } else {
      conversation = currentConversation;
    }
    this.sendMessage(message, conversation);
  }

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverDisplayName;
    }
    return conversation.senderDisplayName;
  }

  setStyle= ({ senderId }, { id }) => ({
    marginLeft: (senderId === id) ? '10%' : 0,
    color: (senderId === id) ? '#fff' : 'grey',
    backgroundColor: (senderId === id) ? '#00bcd4' : '#f7f7f7',
  })

  setHeight = (contentHeight) => {
    this.setState({ contentHeight });
  }

  sendMessage = (message, conversation) => {
    if (message.content) {
      this.props.actions.sendMessage({
        ...message,
        senderId: this.props.profile.id === conversation.senderId ?
          conversation.senderId :
          conversation.receiverId,
        receiverId: this.props.profile.id !== conversation.senderId ?
          conversation.senderId :
          conversation.receiverId,
        conversationId: conversation.id,
      });
      this.setState({
        message: {
          id: '',
          content: '',
        },
      });
    }
  }

  goBack = async () => {
    this.props.actions.navigate({ route: 'MessageList', navigator: 'conversations' });
  }

  deleteConversation = async (conversation) => {
    Alert.alert(
      'Delete conversation?',
      null,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'OK',
          onPress: async () => {
            await this.props.actions.deleteConversation(conversation);
            this.goBack();
          },
        },
      ],
      { cancelable: true },
    );
  }

  deleteMessage = (message) => {
    Alert.alert(
      'Delete message?',
      null,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'OK',
          onPress: async () => {
            await this.props.actions.deleteMessage(message);
          },
        },
      ],
      { cancelable: true },
    );
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
