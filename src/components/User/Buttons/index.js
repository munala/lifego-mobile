import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Text from '../../Common/SuperText';
import styles from '../styles';

const Buttons = ({
  registerMode,
  disabled,
  currentApiCalls,
  onSubmit,
  onToggle,
  toggleResetMode,
}) => (
  <View>
    <TouchableOpacity
      style={styles.button}
      onPress={onSubmit}
      disabled={disabled}
    >
      {
        currentApiCalls > 0 ?
          <ActivityIndicator color="#fff" size="large" /> :
          <Text style={styles.buttonText}>Sign {registerMode ? 'up' : 'in'}</Text>
      }
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.cancelButton]}
      onPress={onToggle}
    >
      <Text style={[styles.buttonText, styles.cancelButtonText]}>
        {registerMode ? 'Already a member?' : 'Need an account? Sign up'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.cancelButton]}
      onPress={() => toggleResetMode(true)}
    >
      <Text style={[styles.buttonText, styles.cancelButtonText]}>
        Forgot password
      </Text>
    </TouchableOpacity>
  </View>
);

Buttons.propTypes = {
  registerMode: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  toggleResetMode: PropTypes.func.isRequired,
};

Buttons.defaultProps = {
  Email: null,
  Password: null,
  Confirm: null,
};

export default Buttons;
