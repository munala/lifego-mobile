import React from 'react';
import {
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../../actions/userActions';
import * as navigationActions from '../../../actions/navigationActions';
import Header from '../../Common/Header';
import BaseClass from './BaseClass';
import Text from '../../Common/SuperText';
import propTypes from './propTypes';
import styles from './styles';

class Settings extends BaseClass {
  componentDidMount = async () => {
    const hideNotifications = await AsyncStorage.getItem('push');
    this.setState({ hideNotifications });
    this.props.actions.getProfile();
  };

  componentDidUpdate = ({ error, profile }) => {
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.props.actions.logout();
      }
    } else if (this.props.profile !== profile) {
      this.setState({
        profile,
      });
    }
  }

  renderInputs = fields => fields.map((name) => {
    let [field] = name.split(' ');
    field = field === 'old' ? 'password' : field;
    return (
      <View key={name}>
        <Text style={styles.inputText}>
          {name === 'email' ? `new ${name} (${this.props.profile.email})` : name}
        </Text>
        <TextInput
          defaultValue={this.state[name]}
          secureTextEntry={field !== 'email'}
          style={styles.input}
          onChangeText={text => this.onChange(text, field)}
          enablesReturnKeyAutomatically
          returnKeyType="next"
          underlineColorAndroid="#00bcd4"
          placeholderTextColor="#bbb"
          placeholder={`type ${name === 'email' ? `type new ${name}` : name}`}
        />
      </View>
    );
  })

  renderSaveButtons = type => (
    <View style={styles.saveButtons}>
      {!this.state.saving &&
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
        onPress={type === 'passwordMode' ? this.changePassword : this.changeEmail}
        disabled={this.validate(type)}
      >
        {this.state.saving ?
          <Text style={styles.saveButtonText}>saving...</Text> :
          <Text style={styles.saveButtonText}>{Platform.OS === 'ios' ? 'Save' : 'SAVE'}</Text>}
      </TouchableOpacity>
    </View>
  )

  render() {
    const {
      profile,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="Settings"
          leftIcon="menu"
          onPressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          mode="profile"
        />
        <View style={styles.body}>
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Push notifications</Text>
            <Switch
              style={styles.switch}
              value={!this.state.hideNotifications}
              onValueChange={this.toggleNotifications}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Reminders</Text>
            <Switch
              style={styles.switch}
              value={profile.reminders}
              onValueChange={this.toggleReminders}
            />
          </View>
          {this.state.emailMode ?
            <View>
              {this.renderInputs(['email', 'password']) }
              {this.renderSaveButtons('emailMode')}
            </View> :
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => this.toggleMode('emailMode', true)}
            >
              <Text style={styles.buttonText}>change email</Text>
            </TouchableOpacity>
          }
          {this.state.passwordMode ?
            <View>
              {this.renderInputs(['old password', 'new password', 'confirm password'])}
              {this.renderSaveButtons('passwordMode')}
            </View> :
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => this.toggleMode('passwordMode', true)}
            >
              <Text style={styles.buttonText}>change password</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

Settings.propTypes = propTypes;

const mapStateToProps = ({ profile, currentApiCalls }) => ({ profile, currentApiCalls });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...userActions, ...navigationActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
