import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Text from '../../Common/SuperText';
import styles from '../styles';

const iconStyles = {
  borderRadius: 20,
  paddingLeft: 20,
  paddingRight: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  iconStyle: {
    display: 'flex',
    alignItems: 'center',
  },
};

const SocialButtons = ({
  loginWithFacebook,
  loginWithGoogle,
}) => (
  <View style={styles.buttons}>
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      onPress={loginWithFacebook}
      {...iconStyles}
    >
      <Text style={styles.buttonText}>Continue with Facebook</Text>
    </Icon.Button>
    <Icon.Button
      name="google"
      backgroundColor="#DD4B39"
      onPress={loginWithGoogle}
      {...iconStyles}
    >
      <Text style={styles.buttonText}>Continue with Google</Text>
    </Icon.Button>
  </View>
);

SocialButtons.propTypes = {
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
};

SocialButtons.defaultProps = {
  Email: null,
  Password: null,
  Confirm: null,
};

export default SocialButtons;
