/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import Text from '../../../../../Common/SuperText';
import styles from '../../../styles';

const ConversationRow = ({
  conversation,
  pictureUrl,
  unread,
  goToConversation,
  openMenu,
  getName,
}) => (
  <TouchableOpacity
    style={styles.notificationView}
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
              (pictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
              'https://',
            )) } :
            require('../../../../../../assets/images/user.png')
        }
      />
      <View style={styles.preview}>
        <Text
          style={[styles.notificationText, {
            color: conversation.read ? 'grey' : '#009baf',
          }]}
          numberOfLines={1}
        >
          { getName(conversation) }
        </Text>
        {
          conversation.messages.length > 0 &&
          <Text numberOfLines={1} style={[styles.wordWrap, unread > 0 && { fontWeight: 'bold' }]}>
            {conversation.messages[0].content}
          </Text>
        }
      </View>
    </View>
  </TouchableOpacity>
);

ConversationRow.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    read: PropTypes.bool,
  }).isRequired,
  pictureUrl: PropTypes.string.isRequired,
  unread: PropTypes.number.isRequired,
  goToConversation: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
};

export default ConversationRow;
