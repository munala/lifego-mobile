import { Component } from 'react';
import { AsyncStorage } from 'react-native';
import propTypes from './propTypes';

let hideNotifications;

AsyncStorage.getItem('push').then((push) => {
  hideNotifications = push;
});

class BaseClass extends Component {
  state={
    emailMode: false,
    passwordMode: false,
    settings: {
      email: '',
      password: '',
      new: '',
      confirm: '',
    },
    hideNotifications: !!hideNotifications,
    saving: false,
  }

  onChange = (text, field) => {
    const { settings } = this.state;
    settings[field] = text;
    this.setState({ settings });
  }

  toggleReminders = () => {
    const {
      id, createdAt, updatedAt, userId, ...profile
    } = { ...this.props.profile };
    profile.reminders = !profile.reminders;
    this.props.actions.updateProfile(profile);
  }

  toggleNotifications = () => {
    if (this.state.hideNotifications) {
      AsyncStorage.removeItem('push');
    } else {
      AsyncStorage.setItem('push', 'true');
    }
    this.setState({
      hideNotifications: !this.state.hideNotifications,
    });
  }

  toggleMode = (type, mode) => {
    const newState = { ...this.state };
    newState[type] = mode;
    this.setState({ ...newState });
  }

  changeEmail = async () => {
    this.setState({ saving: true });
    const { reminders, ...profile } = this.props.profile;
    const { new: newp, confirm, ...rest } = this.state.settings;
    await this.props.actions.changeEmail({
      profile,
      ...rest,
    });
    this.toggleMode('emailMode', false);
    this.setState({ saving: false });
  }

  changePassword = async () => {
    this.setState({ saving: true });
    const { email, ...rest } = this.state.settings;
    await this.props.actions.changePassword({
      ...this.props.profile,
      ...rest,
      newPassword: rest.new,
      oldPassword: rest.password,
    });
    this.toggleMode('passwordMode', false);
    this.setState({ saving: false });
  }

  validate = (mode) => {
    const { email, password, new: newP, confirm } = this.state.settings;
    if (mode === 'emailMode') {
      return (!(email && password));
    }
    return (!(newP, confirm && password));
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
