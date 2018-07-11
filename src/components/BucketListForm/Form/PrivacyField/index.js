import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Picker,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const PrivacyField = ({
  content,
  onChange,
}) => (
  <View >
    <Text style={styles.grey}>Privacy</Text>
    <View style={styles.categoryAndroid}>
      <Picker
        selectedValue={content.privacy}
        style={styles.categoryAndroid}
        mode="dropdown"
        onValueChange={text => onChange(text, 'privacy')}
      >
        <Picker.Item
          value={null}
          label="Select Privacy"
        />
        {['everyone', 'friends', 'no one'].map(privacy => (
          <Picker.Item
            key={privacy}
            value={privacy}
            label={privacy}
          />
        ))}
      </Picker>
    </View>
  </View>
);

PrivacyField.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
};

export default PrivacyField;
