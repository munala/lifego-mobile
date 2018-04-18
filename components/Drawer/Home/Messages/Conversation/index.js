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
      navigate({ route: this.props.previousRoute, navigator: 'conversations' });
    }
  }

  selectMessage = (selectedMessage) => {
    this.setState({ selectedMessage });
  }

  render() {
    const {
      conversation,
      params: { newConversation, id },
      profile,
    } = this.props;
    const { message, selectedMessage } = this.state;
    let name;

    if (conversation || newConversation) {
      name = this.getName(conversation || newConversation);
    }
    if (!conversation && !newConversation) {
      return (<View />);
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
          <Text style={styles.name}>{name}</Text>
          {
            conversation ?
              <Icon
                style={styles.deleteButton}
                onPress={() => this.deleteConversation({ id })}
                name="delete"
                color="red"
                size={24}
              /> :
              <View />
          }
        </View>
        <View style={styles.bodyWrapper}>
          <ScrollView
            contentContainerStyle={styles.body}
            ref={(ref) => { this.scrollView = ref; }}
            onContentSizeChange={() => this.scrollView.scrollToEnd()}
          >
            {
              conversation && conversation.messages.map(chatMessage => (
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
                    {this.setTime(chatMessage)}
                  </Text>
                </TouchableOpacity>
              ))
            }
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
  navigationData: { conversations: { previousRoute, params, params: { id } } },
}, ownProps) => {
  const [conversation] = conversations.filter(chat => chat.id === id);
  return ({
    previousRoute,
    params,
    profile,
    conversation,
    ...ownProps,
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
