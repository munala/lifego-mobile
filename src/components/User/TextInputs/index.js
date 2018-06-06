import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';

import styles from '../styles';

const TextInputs = ({
  user,
  registerMode,
  setRef,
  onChange,
  Email,
  Password,
  Confirm,
}) => (
  <View>
    {
      registerMode &&
        <TextInput
          ref={(element) => {
            setRef({
              key: 'DisplayName',
              value: element,
            });
          }}
          defaultValue={user.displayName}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          onChangeText={value => onChange('displayName', value)}
          placeholder="full name"
          returnKeyType="next"
          onSubmitEditing={() => {
            Email.focus();
          }}
        />
    }
    <TextInput
      ref={(element) => {
        setRef({
          key: 'Email',
          value: element,
        });
      }}
      autoCapitalize="none"
      keyboardType="email-address"
      defaultValue={user.email}
      underlineColorAndroid="rgba(0,0,0,0)"
      style={styles.input}
      placeholderTextColor="#eee"
      onChangeText={value => onChange('email', value)}
      placeholder="example@me.com"
      returnKeyType="next"
      onSubmitEditing={() => {
        Password.focus();
      }}
    />
    <TextInput
      ref={(element) => {
        setRef({
          key: 'Password',
          value: element,
        });
      }}
      defaultValue={user.password}
      underlineColorAndroid="rgba(0,0,0,0)"
      style={styles.input}
      placeholderTextColor="#eee"
      secureTextEntry
      onChangeText={value => onChange('password', value)}
      placeholder="password"
      returnKeyType={registerMode ? 'next' : 'done'}
      onSubmitEditing={() => (registerMode ? Confirm.focus() : null)}
    />
  </View>
);

TextInputs.propTypes = {
  user: PropTypes.shape({}).isRequired,
  registerMode: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  Email: PropTypes.shape({}),
  Password: PropTypes.shape({}),
  Confirm: PropTypes.shape({}),
};

TextInputs.defaultProps = {
  Email: null,
  Password: null,
  Confirm: null,
};

export default TextInputs;
