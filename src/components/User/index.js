/* eslint-disable global-require */
import React from 'react';
import {
  Image,
  ScrollView,
  Linking,
  View,
} from 'react-native';

import TextInputs from './TextInputs';
import Buttons from './Buttons';
import SocialButtons from './SocialButtons';
import styles from './styles';
import propTypes from './propTypes';
import BaseClass from './BaseClass';
import ResetPassword from './ResetPassword';

class User extends BaseClass {
  static navigationOptions = () => ({
    title: 'Login',
    header: null,
  });

  state = {
    registerMode: false,
    disabled: true,
    isLoading: false,
    loginUser: {
      email: '',
      password: '',
    },
    registerUser: {
      displayName: '',
      email: '',
      password: '',
    },
    resetPassword: false,
  };

  componentDidMount = async () => {
    Linking.addEventListener('url', this.handleOpenURL);
    const url = await Linking.getInitialURL();
    if (url) {
      this.handleOpenURL({ url });
    }
  }

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  render() {
    const {
      registerMode,
      registerUser,
      loginUser,
      disabled,
      resetPassword,
    } = this.state;

    const { currentApiCalls } = this.props;
    const user = registerMode ? registerUser : loginUser;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
      >
        <Image
          style={styles.image}
          source={require('../../assets/images/bucketlist_front.jpg')}
        />
        <Image
          style={styles.logo}
          source={require('../../assets/icons/icon.png')}
        />
        {
          !resetPassword ?
            <View>
              <TextInputs
                user={user}
                registerMode={registerMode}
                setRef={this.setRef}
                onChange={this.onChange}
                Email={this.Email}
                Password={this.Password}
                Confirm={this.Confirm}
              />
              <Buttons
                registerMode={registerMode}
                disabled={disabled}
                currentApiCalls={currentApiCalls}
                onSubmit={this.onSubmit}
                onToggle={this.onToggle}
                toggleResetMode={this.toggleResetMode}
              />
            </View> :
            <ResetPassword
              currentApiCalls={currentApiCalls}
              toggleResetMode={this.toggleResetMode}
            />
        }
        <SocialButtons
          loginWithFacebook={this.loginWithFacebook}
          loginWithGoogle={this.loginWithGoogle}
        />
      </ScrollView>
    );
  }
}

User.propTypes = propTypes;

export default User;
