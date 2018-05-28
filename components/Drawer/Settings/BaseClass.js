import { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import propTypes from './propTypes';

class BaseClass extends Component {
  state = {
    emailMode: false,
    passwordMode: false,
    settings: {
      email: '',
      password: '',
      new: '',
      confirm: '',
    },
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
    profile.reminders = profile.reminders ? profile.reminders : false;
    profile.reminders = !profile.reminders;
    this.props.actions.updateProfile(profile, 'settings');
  }

  toggleSettings = (type) => {
    const settings = {
      push: 'hideNotifications',
      expired: 'hideExpired',
    };
    if (this.state[settings[type]]) {
      AsyncStorage.removeItem(type);
    } else {
      AsyncStorage.setItem(type, 'true');
    }
    this.setState({
      [settings[type]]: !this.state[settings[type]],
    });
  }

  toggleMode = (type, mode) => {
    const newState = { ...this.state };
    newState[type] = mode;
    this.setState({ ...newState });
  }

  changeEmail = async () => {
    this.setState(() => ({ saving: true }));
    const { reminders, ...profile } = this.props.profile;
    const { new: newp, confirm, ...rest } = this.state.settings;
    rest.reminders = rest.reminders ? rest.reminders : false;
    const { error } = await this.props.actions.changeEmail({
      profile,
      ...rest,
    });
    if (!error) {
      this.toggleMode('emailMode', false);
    }
    this.setState(() => ({ saving: false }));
  }

  changePassword = async () => {
    this.setState(() => ({ saving: true }));
    const { email, ...rest } = this.state.settings;
    rest.reminders = rest.reminders ? rest.reminders : false;
    const { error } = await this.props.actions.changePassword({
      ...this.props.profile,
      ...rest,
      newPassword: rest.new,
      oldPassword: rest.password,
    });
    if (!error) {
      this.toggleMode('passwordMode', false);
    }
    this.setState(() => ({ saving: false }));
  }

  deleteAccount = async () => {
    Alert.alert(
      'Are you sure?',
      'This action cannot be reversed',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'OK',
          onPress: async () => {
            this.setState(() => ({ saving: true }));
            const { email, password } = this.state.settings;
            const { error } = await this.props.actions.deleteAccount({
              email,
              password,
            });
            if (!error) {
              this.props.actions.logout();
            }
            this.setState({ saving: false });
          },
        },
      ],
      { cancelable: true },
    );
  }

  validate = (mode) => {
    const {
      email, password, new: newP, confirm,
    } = this.state.settings;
    if (mode === 'emailMode' || mode === 'deleteMode') {
      return (!(email && password));
    }
    return (!(newP, confirm && password));
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
