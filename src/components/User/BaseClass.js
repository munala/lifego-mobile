import { Component } from 'react';
import {
  Linking,
  AsyncStorage,
} from 'react-native';

import propTypes from './propTypes';

class BaseClass extends Component {
  onSubmit = async () => {
    if (this.state.registerMode) {
      const { error } = await this.props.actions.register(this.state.registerUser);
      if (!error) {
        this.props.actions.login(this.state.registerUser);
      }
    } else {
      this.props.actions.login(this.state.loginUser);
    }
  }

  onChange = (type, text) => {
    const { registerMode, registerUser, loginUser } = this.state;
    const user = registerMode ? registerUser : loginUser;
    user[type] = (type === 'password' || type === 'confirm') ? text : text.trim();

    const disabled = Object.keys(user).some(key => (user[key].length === 0));

    this.setState({ disabled, loginUser, registerUser });
  }

  onToggle = () => {
    this.setState({
      registerMode: !this.state.registerMode,
      disabled: !this.state.registerMode ? true : this.state.disabled,
    });
  }

  setRef = ({ key, value }) => {
    this[key] = value;
  }

  toggleResetMode = (resetPassword) => {
    this.setState({ resetPassword });
  }

  handleOpenURL = async ({ url }) => {
    const canLogin = JSON.parse(await AsyncStorage.getItem('can_login'));
    if (canLogin) {
      const [, userString] = url.match(/user=([^#]+)/);
      const {
        email,
        name: displayName,
        username: confirm,
        username: password,
        avatar: pictureUrl,
      } = JSON.parse(decodeURI(userString));
      const user = {
        email,
        password,
        confirm,
        displayName,
        pictureUrl,
        social: true,
      };
      this.props.actions.socialLogin(user);
    }
  }

  loginWithFacebook = () => this.openURL('https://bucketlist-node.herokuapp.com/auth/facebook');

  loginWithGoogle = () => this.openURL('https://bucketlist-node.herokuapp.com/auth/google')

  openURL = async (url) => {
    await AsyncStorage.setItem('can_login', 'true');
    Linking.openURL(url);
  };
}

BaseClass.propTypes = propTypes;

export default BaseClass;
