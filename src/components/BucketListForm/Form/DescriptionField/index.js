import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const DescriptionField = ({
  content,
  context,
  onChange,
}) => (
  <View >
    <Text style={styles.grey}>Description</Text>
    <TextInput
      defaultValue={content.description}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      style={[styles.input, { height: 80 }]}
      onChangeText={text => onChange(text, 'description')}
      underlineColorAndroid="#00bcd4"
      placeholderTextColor="#bbb"
      placeholder={`tell us more about your ${context.name}`}
      maxLength={300}
    />
  </View>
);

DescriptionField.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default DescriptionField;
