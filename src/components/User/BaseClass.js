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

    if (type === 'displayName') {
      user[type] = this.titleCase(text).trim();
    }

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

  setRegisterUser = ({ displayName, email }) => {
    const { registerUser } = this.state;

    this.setState({
      registerUser: {
        ...registerUser,
        displayName,
        email,
      },
      registerMode: true,
    });
  }

  titleCase = (name) => {
    let [first, middle, last] = name.split(' ');
    if (first) {
      first = `${first.charAt(0).toUpperCase()}${first.substr(1, first.length - 1)}`;
    }

    if (middle) {
      middle = `${middle.charAt(0).toUpperCase()}${middle.substr(1, middle.length - 1)}`;
    }

    if (last) {
      last = `${last.charAt(0).toUpperCase()}${last.substr(1, last.length - 1)}`;
    }

    return `${first || ''} ${last || ''} ${middle || ''}`;
  }

  toggleResetMode = (resetPassword) => {
    this.setState({ resetPassword });
  }

  handleOpenURL = async ({ url }) => {
    const canLogin = JSON.parse(await AsyncStorage.getItem('can_login'));
    if (canLogin) {
      if (url.includes('user')) {
        const [, userString] = url.match(/user=([^#]+)/);
        const user = JSON.parse(decodeURI(userString));
        this.setRegisterUser(user);
      } if (url.includes('token')) {
        const [, token] = url.match(/token=([^#]+)/);
        AsyncStorage.setItem('token', token);
        this.props.actions.socialLogin(token);
      }
    }
  }

  loginWithFacebook = () => this.openURL('http://api.lifegokenya.com/auth/facebook');

  loginWithGoogle = () => this.openURL('https://api.lifegokenya.com/auth/google')

  openURL = async (url) => {
    await AsyncStorage.setItem('can_login', 'true');
    Linking.openURL(url);
  };
}

BaseClass.propTypes = propTypes;

export default BaseClass;
