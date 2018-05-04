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
    if (message.content) {
      const { params, conversation: currentConversation } = this.props;
      if (!currentConversation) {
        conversation = await this.props.actions
          .startConversation(params.newConversation);
        await this.props.actions.navigate({
          params: { id: conversation.id },
          navigator: 'MessageNavigator',
          route: 'Conversation',
        });
      } else {
        conversation = currentConversation;
      }
      this.sendMessage(message, conversation);
    }
  }

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverDisplayName;
    }
    return conversation.senderDisplayName;
  }

  getId = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverId;
    }
    return conversation.senderId;
  }

  setStyle= ({ senderId }, { id }) => ({
    marginLeft: (senderId === id) ? '10%' : 0,
    color: (senderId === id) ? '#fff' : 'grey',
    backgroundColor: (senderId === id) ? '#00bcd4' : '#f7f7f7',
  })

  setHeight = (contentHeight) => {
    this.setState({ contentHeight });
  }

  saveMessage = async () => {
    if (this.state.editMode) {
      const response = await this.props.actions.updateMessage(this.state.message);
      if (!response.error) {
        this.setState({
          editMode: false,
          message: { content: '' },
          selectedMessage: {},
        });
      }
    } else {
      this.onSubmit();
    }
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
    this.props.actions.navigate({ route: 'MessageList', navigator: 'MessageNavigator', params: { id: undefined, newConversation: undefined } });
  }

  goToProfile = async ({ id }) => {
    const {
      actions: { navigate, getOtherProfile },
      profile,
    } = this.props;

    if (profile.id !== id) {
      getOtherProfile(id);
    }
    await navigate({ route: 'Profile', navigator: 'DrawerNav', params: profile.id !== id && { viewProfile: true, from: 'Home' } });
  }

  deleteConversation = async (conversation) => {
    Alert.alert(
      null,
      'Delete conversation?',
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

  editMessage = () => {
    this.menuContext.closeMenu('messages');
    this.setState({
      message: this.state.selectedMessage,
      editMode: true,
    });
  }

  deleteMessage = () => {
    this.menuContext.closeMenu('messages');
    Alert.alert(
      'Delete message?',
      null,
      [
        {
          text: 'Cancel',
          onPress: () => {} },
        {
          text: 'OK',
          onPress: () => {
            this.props.actions.deleteMessage(this.state.selectedMessage);
          },
        },
      ],
      { cancelable: true },
    );
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
