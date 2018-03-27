import { Component } from 'react';

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

  onSubmit = () => {
    const { message } = this.state;
    const { conversation } = this.props;
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

  getName = (conversation) => {
    if (this.props.profile.id === conversation.senderId) {
      return conversation.receiverDislayName;
    }
    return conversation.senderDislayName;
  }

  setStyle= ({ senderId }, { id }) => ({
    marginLeft: (senderId === id) ? '10%' : 0,
    color: (senderId === id) ? '#fff' : 'grey',
    backgroundColor: (senderId === id) ? '#00bcd4' : '#f7f7f7',
  })

  setHeight = (contentHeight) => {
    this.setState({ contentHeight });
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.props.navigation.setParams({ id: undefined });
  }

  deleteConversation = async (conversation) => {
    await this.props.actions.deleteConversation(conversation);
    this.goBack();
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
