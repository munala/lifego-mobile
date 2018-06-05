import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import Text from '../../../Common/SuperText';
import GooglePlacesInput from './GooglePlacesSearch';
import styles from '../../styles';

const LocationField = ({
  content,
  onChange,
  listViewDisplayed,
}) => (
  <View >
    <Text style={styles.grey}>Location</Text>
    <GooglePlacesInput
      onChange={onChange}
      content={content}
      listViewDisplayed={listViewDisplayed}
    />
    <View style={styles.hr} />
  </View>
);

LocationField.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  listViewDisplayed: PropTypes.bool.isRequired,
};

export default LocationField;
