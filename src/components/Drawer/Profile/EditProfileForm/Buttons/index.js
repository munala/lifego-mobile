import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Text from '../../../../Common/SuperText';
import styles from '../../styles';

const Buttons = ({
  cancel,
  onSave,
  profile,
}) => (
  <View style={styles.buttons}>
    <TouchableOpacity
      style={[styles.button, styles.cancelButton]}
      onPress={cancel}
    >
      <Text style={[styles.buttonText, styles.cancelButtonText]}>
        {Platform.OS === 'ios' ? 'Cancel' : 'CANCEL'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={onSave}
      disabled={!(profile.displayName)}
    >
      <Text style={styles.buttonText}>
        {Platform.OS === 'ios' ? 'Save' : 'SAVE'}
      </Text>
    </TouchableOpacity>
  </View>
);

Buttons.propTypes = {
  cancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Buttons;
