import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Text from '../../Common/SuperText';
import { resetPassword } from '../../../actions/userActions';
import styles from '../styles';

class ResetPassword extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      resetPassword: PropTypes.func.isRequired,
    }).isRequired,
    toggleResetMode: PropTypes.func.isRequired,
    currentApiCalls: PropTypes.number.isRequired,
  }

  state = {
    email: '',
  }

  onChange = (email) => {
    this.setState({ email });
  }

  onSubmit = async () => {
    await this.props.actions.resetPassword(this.state.email);
    this.props.toggleResetMode(false);
  }

  render() {
    const { email } = this.state;

    return (
      <View>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          defaultValue={email}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          onChangeText={this.onChange}
          placeholder="example@me.com"
          returnKeyType="send"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSubmit}
          disabled={!email}
        >
          {
            this.props.currentApiCalls > 0 ?
              <ActivityIndicator color="#fff" size="large" /> :
              <Text style={styles.buttonText}>Reset password</Text>
          }
        </TouchableOpacity>
        {
          this.props.currentApiCalls === 0 &&
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'grey' }]}
            onPress={() => this.props.toggleResetMode(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators({ resetPassword }, dispatch),
}))(ResetPassword);
