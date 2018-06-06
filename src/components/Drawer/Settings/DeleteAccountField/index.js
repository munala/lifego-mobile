import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const DeleteAccountField = ({
  deleteMode,
  renderInputs,
  renderSaveButtons,
  toggleMode,
}) => (deleteMode ?
  <View>
    {renderInputs(['delete email', 'password'])}
    {renderSaveButtons('deleteMode')}
  </View> :
  <TouchableOpacity
    style={styles.buttons}
    onPress={() => toggleMode('deleteMode', true)}
  >
    <Text style={[styles.buttonText, { color: 'red' }]}>Delete Account</Text>
  </TouchableOpacity>);

DeleteAccountField.propTypes = {
  deleteMode: PropTypes.bool.isRequired,
  renderInputs: PropTypes.func.isRequired,
  renderSaveButtons: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default DeleteAccountField;
