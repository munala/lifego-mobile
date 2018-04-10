import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseClass from './BaseClass';
import * as messageActions from '../../../../../actions/messageActions';
import * as userActions from '../../../../../actions/userActions';
import Text from '../../../../Common/SuperText';
import styles from '../../styles';
import propTypes from './propTypes';

class Conversation extends BaseClass {
  componentWillMount = () => {
    if (this.props.conversation) {
      this.props.conversation.messages
        .filter(chatMessage => chatMessage.receiverId === this.props.profile.id)
        .forEach(message => this.props.actions.markAsRead(message));
    }
  }

  componentDidMount = () => {
    if (this.scrollView) {
      this.scrollView.scrollToEnd({ animated: true });
    }
  }

  componentWillReceiveProps = ({ conversation }) => {
    if (!conversation) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const {
      conversation,
      navigation: { state: { params: { newConversation, id } } },
      profile,
      actions: { deleteConversation },
    } = this.props;
    const { message } = this.state;
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
                onPress={() => deleteConversation({ id })}
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
                <Text
                  key={chatMessage.id}
                  style={[this.setStyle(chatMessage, profile), styles.message]}
                >
                  {chatMessage.content}
                </Text>
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

const mapStateToProps = ({ profile, conversations }, ownProps) => {
  const { state: { params: { id } } } = ownProps.navigation;
  const [conversation] = conversations.filter(chat => chat.id === id);
  return ({
    profile,
    conversation,
    ...ownProps,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...messageActions, ...userActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
