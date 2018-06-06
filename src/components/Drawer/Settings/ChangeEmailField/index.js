import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const ChangeEmailField = ({
  emailMode,
  renderInputs,
  renderSaveButtons,
  toggleMode,
}) => (emailMode ?
  <View>
    {renderInputs(['email', 'password']) }
    {renderSaveButtons('emailMode')}
  </View> :
  <TouchableOpacity
    style={styles.buttons}
    onPress={() => toggleMode('emailMode', true)}
  >
    <Text style={styles.buttonText}>Change email</Text>
  </TouchableOpacity>);

ChangeEmailField.propTypes = {
  emailMode: PropTypes.bool.isRequired,
  renderInputs: PropTypes.func.isRequired,
  renderSaveButtons: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default ChangeEmailField;
