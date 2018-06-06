import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';

import Text from '../../../../Common/SuperText';
import styles from '../../styles';

const Fields = ({
  onChange,
  displayName,
}) => ['first name', 'last name'].map(name => (
  <View key={name} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Text numberOfLines={1} style={styles.grey}>{name}</Text>
    <TextInput
      defaultValue={displayName[name]}
      style={styles.input}
      onChangeText={text => onChange(text, name)}
      selectTextOnFocus={name === 'first name'}
      enablesReturnKeyAutomatically
      returnKeyType="next"
      underlineColorAndroid="#00bcd4"
      placeholderTextColor="#bbb"
      placeholder={`enter your ${name}`}
    />
  </View>
));

Fields.propTypes = {
  onChange: PropTypes.func.isRequired,
  displayName: PropTypes.shape({
    'first name': PropTypes.string.isRequired,
    'last name': PropTypes.string.isRequired,
  }).isRequired,
};

export default Fields;
