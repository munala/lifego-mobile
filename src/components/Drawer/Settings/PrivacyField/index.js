import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Picker,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const PrivacyField = ({
  privacy,
  onChange,
}) => (
  <View style={styles.categoryField}>
    <Text style={styles.grey}>Privacy</Text>
    <View style={styles.categoryAndroid}>
      <Picker
        selectedValue={privacy}
        style={styles.categoryAndroid}
        mode="dropdown"
        onValueChange={onChange}
      >
        <Picker.Item
          value={null}
          label="Select Privacy"
        />
        {['everyone', 'friends', 'no one'].map(privacyItem => (
          <Picker.Item
            key={privacyItem}
            value={privacyItem}
            label={privacyItem}
          />
        ))}
      </Picker>
    </View>
  </View>
);

PrivacyField.propTypes = {
  onChange: PropTypes.func.isRequired,
  privacy: PropTypes.string.isRequired,
};

export default PrivacyField;
