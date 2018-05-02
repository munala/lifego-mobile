import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  state = {
    searching: false,
    searchText: '',
  }

  onRefresh =() => {
    this.props.actions.getConversations();
  }

  onChange = (searchText) => {
    this.setState({ searchText });
  }

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverDisplayName;
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

  goToConversation = async (conversation) => {
    this.props.actions.navigate({
      route: 'Conversation',
      navigator: 'MessageNavigator',
      params: { id: conversation.id },
    });
  };

  truncateMessage = (message) => {
    if (message.length > 30) {
      return `${message.substr(0, 30)} ...`;
    }
    return message;
  }

  startChat = async (receiver) => {
    const newConversation = {
      senderId: this.props.profile.id,
      senderDisplayName: this.props.profile.displayName,
      senderUsername: this.props.profile.username,
      senderPictureUrl: this.props.profile.pictureUrl,
      receiverId: receiver.id,
      receiverPictureUrl: receiver.pictureUrl,
      receiverUsername: receiver.username,
      receiverDisplayName: receiver.displayName,
    };
    this.props.actions.navigate({
      route: 'Conversation',
      navigator: 'MessageNavigator',
      params: { id: null, newConversation },
    });
  }

  toggleNew = () => {
    this.setState({ searching: !this.state.searching });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
