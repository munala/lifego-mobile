import React from 'react';
import {
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from 'react-native';

import Header from '../../../containers/Header';
import BaseClass from './BaseClass';
import Text from '../../Common/SuperText';
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
        <Text style={styles.inputText}>
          {displayName}
        </Text>
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
    const actions = {
      passwordMode: this.changePassword,
      emailMode: this.changeEmail,
      deleteMode: this.deleteAccount,
    };
    const text = type === 'deleteMode' ? 'DELETE ACCOUNT' : (Platform.OS === 'ios' ? 'Save' : 'SAVE'); // eslint-disable-line no-nested-ternary

    return (
      <View style={styles.saveButtons}>
        {
          !this.state.saving &&
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
            this.state.saving ?
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
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Push notifications</Text>
            <Switch
              style={styles.switch}
              value={!this.state.hideNotifications}
              onValueChange={() => this.toggleSettings('push')}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Show expired bucketlists</Text>
            <Switch
              style={styles.switch}
              value={!this.state.hideExpired}
              onValueChange={() => this.toggleSettings('expired')}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Email reminders</Text>
            <Switch
              style={styles.switch}
              value={profile.reminders === true}
              onValueChange={this.toggleReminders}
            />
          </View>
          {
            this.state.emailMode ?
              <View>
                {this.renderInputs(['email', 'password']) }
                {this.renderSaveButtons('emailMode')}
              </View> :
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.toggleMode('emailMode', true)}
              >
                <Text style={styles.buttonText}>Change email</Text>
              </TouchableOpacity>
          }
          {
            this.state.passwordMode ?
              <View>
                {this.renderInputs(['old password', 'new password', 'confirm password'])}
                {this.renderSaveButtons('passwordMode')}
              </View> :
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.toggleMode('passwordMode', true)}
              >
                <Text style={styles.buttonText}>Change password</Text>
              </TouchableOpacity>
          }
          {
            this.state.deleteMode ?
              <View>
                {this.renderInputs(['delete email', 'password'])}
                {this.renderSaveButtons('deleteMode')}
              </View> :
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.toggleMode('deleteMode', true)}
              >
                <Text style={[styles.buttonText, { color: 'red' }]}>Delete Account</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

Settings.propTypes = propTypes;

export default Settings;
