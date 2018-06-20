import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../../../styles';


const NewMessage = ({
  message,
  onChange,
  saveMessage,
}) => (
  <View style={styles.newMessage}>
    <TextInput
      placeholder="type message"
      underlineColorAndroid="transparent"
      style={[styles.inputStyles, {
        color: '#444',
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 10,
        marginRight: 5,
      }]}
      value={message.content}
      placeholderTextColor="#bbb"
      onChangeText={onChange}
      onKeyPress={({ key }) => {
        if (key === 'Enter') {
          saveMessage();
        }
      }}
    />
    <Icon
      style={styles.newButton}
      onPress={saveMessage}
      name="send"
      color="#00bcd4"
    />
  </View>
);

NewMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  saveMessage: PropTypes.func.isRequired,
};

export default NewMessage;
