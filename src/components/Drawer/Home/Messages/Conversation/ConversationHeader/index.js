import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../../../../Common/SuperText';
import styles from '../../../styles';


const ConversationHeader = ({
  goBack,
  goToProfile,
  deleteConversation,
  userId,
  name,
  conversation,
  id,
}) => (
  <View style={styles.top}>
    <Icon
      style={styles.backButton}
      onPress={goBack}
      name="chevron-left"
      color="#00bcd4"
      size={30}
    />
    <TouchableOpacity onPress={() => goToProfile({ id: userId })}>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
    <Icon
      style={styles.deleteButton}
      onPress={conversation ? () => deleteConversation({ id }) : goBack}
      name="delete"
      color="red"
      size={24}
    />
  </View>
);

ConversationHeader.propTypes = {
  goBack: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  conversation: PropTypes.shape({}),
  id: PropTypes.number,
};

ConversationHeader.defaultProps = {
  conversation: null,
  id: null,
};

export default ConversationHeader;
