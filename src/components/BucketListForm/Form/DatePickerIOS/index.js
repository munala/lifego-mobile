import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  DatePickerIOS,
} from 'react-native';

const NameField = ({
  date,
  minDate,
  onDateChange,
}) => (
  <View>
    <DatePickerIOS
      mode="date"
      date={date}
      minimumDate={minDate}
      onDateChange={onDateChange}
    />
  </View>
);

NameField.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.shape({}).isRequired,
  minDate: PropTypes.shape({}).isRequired,
};

export default NameField;
