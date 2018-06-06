import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Switch,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const ToggleSwitch = ({
  label,
  value,
  onValueChange,
}) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchText}>{label}</Text>
    <Switch
      style={styles.switch}
      value={value}
      onValueChange={onValueChange}
    />
  </View>
);

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
