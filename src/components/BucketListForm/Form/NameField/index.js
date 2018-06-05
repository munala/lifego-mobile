import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const NameField = ({
  content,
  context,
  onChange,
}) => (
  <View >
    <Text style={styles.grey}>Name</Text>
    <TextInput
      defaultValue={content.name}
      style={styles.input}
      onChangeText={text => onChange(text, 'name')}
      selectTextOnFocus={context.type === 'Edit'}
      enablesReturnKeyAutomatically
      returnKeyType="next"
      underlineColorAndroid="#00bcd4"
      placeholderTextColor="#bbb"
      placeholder={`name of ${context.name}`}
    />
  </View>
);

NameField.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default NameField;
