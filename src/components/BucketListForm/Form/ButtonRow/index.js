import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const ButtonRow = ({
  goBack,
  onSave,
  disabled,
  saving,
}) => (
  <View style={styles.buttons}>
    <TouchableOpacity
      style={[styles.button, styles.cancelButton]}
      onPress={() => goBack()}
    >
      <Text style={[styles.buttonText, styles.cancelButtonText]}>
        {Platform.OS === 'ios' ? 'Cancel' : 'CANCEL'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={onSave}
      disabled={disabled || saving}
    >
      {
        saving ?
          <Text style={styles.buttonText}>saving...</Text> :
          <Text style={styles.buttonText}>
            {Platform.OS === 'ios' ? 'Save' : 'SAVE'}
          </Text>
      }
    </TouchableOpacity>
  </View>
);

ButtonRow.propTypes = {
  goBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
};

export default ButtonRow;
