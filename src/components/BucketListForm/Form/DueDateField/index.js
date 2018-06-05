import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const DueDateField = ({
  content,
  context,
  showDatePicker,
  onDateChange,
}) => (
  <View >
    <Text style={styles.grey}>Due date</Text>
    <TouchableOpacity
      style={styles.dateButton}
      selectTextOnFocus={context.type === 'Edit'}
      onPress={showDatePicker}
    >
      <Text style={styles.input}>
        {content.dueDate ? (new Date(content.dueDate)).toString() : 'due date for bucketlist'}
      </Text>
      {
        content.dueDate &&
        <Icon
          name="clear"
          color="red"
          type="material-icons"
          size={16}
          onPress={() => onDateChange()}
          underlayColor="#fff"
        />
      }
    </TouchableOpacity>
  </View>
);

DueDateField.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  showDatePicker: PropTypes.func.isRequired,
};

export default DueDateField;
