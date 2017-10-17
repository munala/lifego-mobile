import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

class UserForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.state = {
      registerMode: false,
      disabled: true,
    };
    this.content = {
      username: '',
      email: '',
      password: '',
    };
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 150,
        backgroundColor: '#f7f7f7',
      },
      input: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 2,
        padding: 15,
        borderBottomColor: '#bbb',
        borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fafafa',
      },
      button: {
        flexDirection: 'row',
        height: 45,
        alignSelf: 'stretch',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#05A5D1',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButton: {
        backgroundColor: 'rgba(255,255,255,0)',
      },
      cancelButtonText: {
        color: '#aaa',
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.loggedIn) {
      this.props.navigation.navigate('bucketlist');
    }
  }
  onChange(type, text) {
    this.content[type] = text;
    const content = this.content;
    let disabled = false;
    if (!this.state.registerMode) {
      delete content.email;
    }
    Object.keys(content).forEach((key) => {
      if (this.content[key].length === 0) {
        disabled = true;
      }
    });
    this.setState({ disabled });
  }
  onToggle() {
    this.setState({
      registerMode: !this.state.registerMode,
      disabled: !this.state.registerMode ? true : this.state.disabled,
    });
  }
  onSubmit() {
    this.props.screenProps.onSubmit(this.content, this.state.registerMode);
  }

  render() {
    return (
      <View style={this.styles.container}>
        <TextInput
          defaultValue={this.content.username}
          style={this.styles.input}
          onChangeText={this.onChange.bind(null, 'username')}
          placeholder="username"
        />
        {
          this.state.registerMode &&
          <TextInput
            defaultValue={this.content.email}
            style={this.styles.input}
            onChangeText={this.onChange.bind(null, 'email')}
            placeholder="example@me.com"
          />
        }
        <TextInput
          defaultValue={this.content.password}
          style={this.styles.input}
          secureTextEntry
          onChangeText={this.onChange.bind(null, 'password')}
          placeholder="password"
        />
        <TouchableHighlight
          style={this.styles.button}
          onPress={this.onSubmit}
          disabled={this.state.disabled}
        >
          <Text style={this.styles.buttonText}>{this.state.registerMode ? 'Register' : 'Login'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[this.styles.button, this.styles.cancelButton]}
          onPress={this.onToggle}
          underlayColor="#eee"
        >
          <Text style={[this.styles.buttonText, this.styles.cancelButtonText]}>{this.state.registerMode ? 'Already a member?' : 'Don\'t have an account?'}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
UserForm.propTypes = {
  onSubmit: PropTypes.func,
  navigation: PropTypes.object,
  screenProps: PropTypes.object,
};

export default UserForm;
