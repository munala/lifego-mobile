import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, Platform } from 'react-native';

const SuperText = props => (
  <Text
    style={[props.style, { fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto' }]}
    numberOfLines={props.numberOfLines}
    ellipsizeMode="tail"
  >
    {props.children}
  </Text>
);

SuperText.propTypes = {
  style: Text.propTypes.style,
  numberOfLines: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.any),
  ]),
};

SuperText.defaultProps = {
  style: null,
  children: '',
  numberOfLines: undefined,
};

export default SuperText;
