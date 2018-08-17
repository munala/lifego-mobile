import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  state = {
    searching: false,
    searchText: '',
    conversation: null,
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
    .filter(message => !message.read && message.receiverId === this.props.profile.id)
    .length

  markAllAsRead = () => {
    this.props.conversations.forEach((conversation) => {
      this.markAsRead(conversation);
    });
  }

  markAsRead = (conversation) => {
    conversation.messages.forEach((message) => {
      if (!message.read && message.senderId !== this.props.profile.id) {
        this.props.actions.markAsRead(message);
      }
    });
    this.closeMenu();
  }

  goToConversation = async (conversation) => {
    this.markAsRead(conversation);
    this.props.actions.navigate({
      route: 'Conversation',
      navigator: 'MessageNavigator',
      params: { id: conversation.id },
    });
  };

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
      params: {
        id: null,
        newConversation,
      },
    });
  }

  toggleNew = () => {
    this.setState({ searching: !this.state.searching });
  }

  deleteConversation = async (conversation) => {
    this.closeMenu();
    this.setState({
      showDialog: true,
      conversation,
      deleteMode: 'conversation',
    });
  }

  delete = async () => {
    this.closeDialog();
    await this.props.actions.deleteConversation(this.state.conversation);
    this.setState({ conversation: null });
  }

  cancel = () => {
    this.setState({
      editMode: false,
      deleteMode: '',
      conversation: null,
    });
  }

  openMenu = (conversation) => {
    this.setState({
      conversation,
      showMenu: true,
    });
  }

  closeMenu = () => {
    this.setState({
      showMenu: false,
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
