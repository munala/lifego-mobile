import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const ChangePasswordField = ({
  passwordMode,
  renderInputs,
  renderSaveButtons,
  toggleMode,
}) => (passwordMode ?
  <View>
    {renderInputs(['old password', 'new password', 'confirm password'])}
    {renderSaveButtons('passwordMode')}
  </View> :
  <TouchableOpacity
    style={styles.buttons}
    onPress={() => toggleMode('passwordMode', true)}
  >
    <Text style={styles.buttonText}>Change password</Text>
  </TouchableOpacity>);

ChangePasswordField.propTypes = {
  passwordMode: PropTypes.bool.isRequired,
  renderInputs: PropTypes.func.isRequired,
  renderSaveButtons: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default ChangePasswordField;
