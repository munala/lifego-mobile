import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, Platform } from 'react-native';

const SuperText = props => (
  <Text style={[props.style, { fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto' }]}>
    {props.children}
  </Text>
);

SuperText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

SuperText.defaultProps = {
  style: null,
  children: '',
};

export default SuperText;
