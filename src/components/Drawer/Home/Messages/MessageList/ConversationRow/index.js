/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import Text from '../../../../../Common/SuperText';
import { setTime } from '../../../../../../utils';
import styles from '../../../styles';

const ConversationRow = ({
  conversation,
  pictureUrl,
  profile,
  unread,
  goToConversation,
  openMenu,
  getName,
}) => {
  let createdAt = '';
  let time = '';
  if (conversation.messages.length > 0) {
    const timeData = setTime(conversation.messages[0]);
    createdAt = timeData.createdAt;
    time = timeData.time;
  }
  const dateTime = `${createdAt}${time}`;

  return (
    <TouchableOpacity
      style={[styles.notificationView, { backgroundColor: unread === 0 ? 'transparent' : '#f7f7f7' }]}
      key={conversation.id}
      onPress={() => goToConversation(conversation)}
      onLongPress={() => openMenu(conversation)}
      delayLongPress={500}
      activeOpacity={1}
    >
      <View style={styles.notification}>
        <Image
          style={styles.avatar}
          source={
            pictureUrl ?
              { uri: (pictureUrl.replace(
                (pictureUrl.includes('https://') ? 'https://' : 'http://'),
                'https://',
              )) } :
              require('../../../../../../assets/images/user.png')
          }
        />
        <View style={styles.preview}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
          }}
          >
            <Text
              style={[styles.notificationText, {
                marginLeft: 10,
                color: 'grey',
                fontWeight: 'bold',
              }]}
              numberOfLines={1}
            >
              {getName(conversation)}
            </Text>
            <Text style={[styles.timeSent, {
              alignSelf: 'flex-start',
              color: unread === 0 ? 'grey' : '#00bcd4',
            }]}
            >{dateTime}</Text>
          </View>
          {
            conversation.messages.length > 0 &&
            <Text numberOfLines={1} style={styles.wordWrap}>
              {conversation.messages[0].senderId === profile.id ? 'You: ' : ''}{conversation.messages[0].content}
            </Text>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

ConversationRow.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    read: PropTypes.bool,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  pictureUrl: PropTypes.string,
  unread: PropTypes.number.isRequired,
  goToConversation: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
};

ConversationRow.defaultProps = {
  pictureUrl: null,
};

export default ConversationRow;
