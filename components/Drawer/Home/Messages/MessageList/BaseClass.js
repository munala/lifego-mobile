import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  state={
    searching: false,
    searchText: '',
  }

  onChange = (searchText) => {
    this.setState({ searchText });
  }

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverUsername;
    }
    return conversation.senderDisplayName;
  }

  getUser = id => this.props.profile.friends.filter(user => user.id === id)[0]

  setPictureUrl = (conversation) => {
    if (this.props.profile.id !== conversation.receiverId) {
      return conversation.receiverPictureUrl;
    }
    return conversation.senderPictureUrl;
  }

  getUnreadCount = conversation => conversation.messages
    .filter(message => !message.read && message.receiverId === this.props.profile.id).length

  markAllAsRead = () => {
    this.props.conversations.forEach((conversation) => {
      this.markAsRead(conversation);
    });
  }

  goToConversation = (conversation) => {
    this.props.navigation.navigate('Conversation', { id: conversation.id });
  };

  truncateMessage = (message) => {
    if (message.length > 30) {
      return `${message.substr(0, 30)} ...`;
    }
    return message;
  }

  startChat = async (receiver) => {
    await this.props.actions.startConversation({
      senderId: this.props.profile.id,
      senderDisplayName: this.props.profile.id,
      senderUsername: this.props.profile.username,
      senderPictureUrl: this.props.profile.pictureUrl,
      receiverId: receiver.id,
      receiverPictureUrl: receiver.pictureUrl,
      receiverUsername: receiver.username,
      receiverDisplayName: receiver.displayName,
    });
    const conversation = this.props.conversations[this.props.conversations.length - 1];
    this.props.navigation.navigate('Conversation', { id: conversation.id });
  }

  toggleNew = () => {
    this.setState({ searching: !this.state.searching });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
