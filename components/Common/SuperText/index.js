import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, Platform } from 'react-native';

const SuperText = props => (
  <Text style={[props.style, { fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto' }]}>
    {props.children}
  </Text>
);

SuperText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.any),
  ]),
};

SuperText.defaultProps = {
  style: null,
  children: '',
};

export default SuperText;
