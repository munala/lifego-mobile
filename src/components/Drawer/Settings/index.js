import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from 'react-native';

import Header from '../../../containers/Header';
import BaseClass from './BaseClass';
import Text from '../../Common/SuperText';
import Switch from './Switch';
import ChangeEmailField from './ChangeEmailField';
import ChangePasswordField from './ChangePasswordField';
import DeleteAccountField from './DeleteAccountField';
import propTypes from './propTypes';
import styles from './styles';

class Settings extends BaseClass {
  componentDidMount = async () => {
    const hideNotifications = await AsyncStorage.getItem('push');
    const hideExpired = await AsyncStorage.getItem('expired');
    this.setState({ hideNotifications, hideExpired });
    this.props.actions.getProfile();
  };

  componentDidUpdate = ({ error, profile }) => {
    if (!error && this.props.profile !== profile) {
      this.setState({
        profile,
      });
    }
  }

  renderInputs = fields => fields.map((name) => {
    let [field] = name.split(' ');
    field = field === 'old' ? 'password' : field;
    field = field === 'delete' ? 'email' : field;
    let displayName = name === 'email' ? `new ${name} (${this.props.profile.email})` : name;
    displayName = name === 'delete email' ? 'email' : displayName;

    return (
      <View key={name}>
        <Text style={styles.inputText}>{displayName}</Text>
        <TextInput
          defaultValue={this.state[name === 'delete email' ? 'email' : name]}
          secureTextEntry={field !== 'email'}
          style={styles.input}
          onChangeText={text => this.onChange(text, field)}
          enablesReturnKeyAutomatically
          returnKeyType="next"
          underlineColorAndroid="#00bcd4"
          placeholderTextColor="#bbb"
          placeholder={`type ${displayName}`}
        />
      </View>
    );
  })

  renderSaveButtons = (type) => {
    const { saving } = this.state;
    const actions = {
      passwordMode: this.changePassword,
      emailMode: this.changeEmail,
      deleteMode: this.deleteAccount,
    };
    const text = type === 'deleteMode' ? // eslint-disable-line no-nested-ternary
    'DELETE ACCOUNT' :
      (Platform.OS === 'ios' ? 'Save' : 'SAVE');

    return (
      <View style={styles.saveButtons}>
        {
          !saving &&
          <TouchableOpacity
            style={[styles.saveButton, styles.cancelButton]}
            onPress={() => this.toggleMode(type, false)}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              {Platform.OS === 'ios' ? 'Cancel' : 'CANCEL'}
            </Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={styles.saveButton}
          onPress={actions[type]}
          disabled={this.validate(type)}
        >
          {
            saving ?
              <Text style={styles.saveButtonText}>
                {`${type === 'deleteMode' ? 'deleting' : 'saving'}...`}
              </Text> :
              <Text style={[styles.saveButtonText, type === 'deleteMode' && { color: 'red' }]}>
                {text}
              </Text>
          }
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { profile } = this.props;
    const {
      hideNotifications,
      hideExpired,
      emailMode,
      passwordMode,
      deleteMode,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          title="Settings"
          leftIcon="menu"
          onPressLeft={() => this.props.actions.navigate({
            route: 'DrawerOpen',
            navigator: 'DrawerNav',
          })}
          mode="profile"
        />
        <View style={styles.body}>
          <Switch
            label="Push notifications"
            value={!hideNotifications}
            onValueChange={() => this.toggleSettings('push')}
          />
          <Switch
            label="Show expired bucketlists"
            value={!hideExpired}
            onValueChange={() => this.toggleSettings('expired')}
          />
          <Switch
            label="Email reminders"
            value={profile.reminders === true}
            onValueChange={this.toggleReminders}
          />
          <ChangeEmailField
            emailMode={emailMode}
            renderInputs={this.renderInputs}
            renderSaveButtons={this.renderSaveButtons}
            toggleMode={this.toggleMode}
          />
          <ChangePasswordField
            passwordMode={passwordMode}
            renderInputs={this.renderInputs}
            renderSaveButtons={this.renderSaveButtons}
            toggleMode={this.toggleMode}
          />
          <DeleteAccountField
            deleteMode={deleteMode}
            renderInputs={this.renderInputs}
            renderSaveButtons={this.renderSaveButtons}
            toggleMode={this.toggleMode}
          />
        </View>
      </View>
    );
  }
}

Settings.propTypes = propTypes;

export default Settings;
