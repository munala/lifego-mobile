import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Platform,
  Linking,
  View,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.state = {
      registerMode: false,
      disabled: true,
      isLoading: false,
      user: undefined,
    };
    this.content = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      social: false,
    };
    this.iconStyles = {
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
      iconStyle: {
        paddingVertical: 5,
        flexBasis: '10%',
      },
    };

    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(127,127,127,0.8)',
        height: '100%',
      },
      input: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 3,
        marginTop: 2,
        padding: Platform.OS === 'ios' ? 15 : 5,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 0,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: 'transparent',
      },
      button: {
        borderRadius: 20,
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 45 : 30,
        alignSelf: 'stretch',
        marginTop: 10,
        marginLeft: 70,
        marginRight: 70,
        backgroundColor: '#00bcd4',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButton: {
        backgroundColor: 'rgba(255,255,255,0)',
      },
      cancelButtonText: {
        color: '#fff',
      },
      image: {
        opacity: 0.5,
        backgroundColor: '#aaa',
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        margin: 20,
      },
      avatarImage: {
        borderRadius: 50,
        height: 100,
        width: 100,
      },
      header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      text: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
      },
      buttons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 20,
        marginBottom: 30,
      },
    });
  }
  componentWillMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.loggedIn) {
      this.props.navigation.navigate('bucketlist');
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  onChange(type, text) {
    this.content[type] = (type === 'password' || type === 'password') ? text : text.trim();
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
  handleOpenURL({ url }) {
    const [, user_string] = url.match(/user=([^#]+)/);
    console.log(decodeURI(url));
    this.setState({
      user: {
        ...JSON.parse(decodeURI(user_string)),
        social: true,
      },
    });
  }
  loginWithFacebook = () => this.openURL('https://bucketlist-node.herokuapp.com/auth/facebook');

  loginWithGoogle = () => this.openURL('https://bucketlist-node.herokuapp.com/auth/google');

  openURL = (url) => {
    Linking.openURL(url);
  };


  render() {
    return (
      <ScrollView
        contentContainerStyle={this.styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
        refreshControl={
          <RefreshControl
            refreshing={this.props.screenProps.currentApiCalls > 0}
            onRefresh={this.onRefresh}
            colors={['#05A5D1']}
            tintColor="#fff"
            enabled={false}
          />
        }
      >
        <Image
          style={this.styles.image}
          source={require('../images/bucketlist_front.jpg')}
        />
        <TextInput
          autoFocus
          autoCapitalize="none"
          defaultValue={this.content.username}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={this.styles.input}
          placeholderTextColor="#eee"
          onChangeText={this.onChange.bind(null, 'username')}
          placeholder="username"
          returnKeyType="next"
          onSubmitEditing={(event) => {
            if (this.state.registerMode) {
              this.refs.Email.focus();
            } else {
              this.refs.Password.focus();
            }
          }}
        />
        {
          this.state.registerMode &&
          <TextInput
            ref="Email"
            keyboardType="email-address"
            defaultValue={this.content.email}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={this.styles.input}
            placeholderTextColor="#eee"
            onChangeText={this.onChange.bind(null, 'email')}
            placeholder="example@me.com"
            returnKeyType="next"
            onSubmitEditing={(event) => {
              this.refs.Password.focus();
            }}
          />}
        <TextInput
          ref="Password"
          defaultValue={this.content.password}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={this.styles.input}
          placeholderTextColor="#eee"
          secureTextEntry
          onChangeText={this.onChange.bind(null, 'password')}
          placeholder="password"
          returnKeyType={this.state.registerMode ? 'next' : 'done'}
          onSubmitEditing={event => (this.state.registerMode ? this.refs.Confirm.focus() : null)}
        />
        {
          this.state.registerMode &&
          <TextInput
            ref="Confirm"
            defaultValue={this.content.password}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={this.styles.input}
            placeholderTextColor="#eee"
            secureTextEntry
            onChangeText={this.onChange.bind(null, 'confirm')}
            placeholder="confirm"
            returnKeyType="done"
          />
        }
        <TouchableHighlight
          style={this.styles.button}
          onPress={this.onSubmit}
          disabled={this.state.disabled}
        >
          <Text style={this.styles.buttonText}>Sign {this.state.registerMode ? 'up' : 'in'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[this.styles.button, this.styles.cancelButton]}
          onPress={this.onToggle}
          underlayColor="#eee"
        >
          <Text style={[this.styles.buttonText, this.styles.cancelButtonText]}>{this.state.registerMode ? 'Already a member?' : 'Need an account?'}</Text>
        </TouchableHighlight>
        <View style={this.styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...this.iconStyles}
          >
            <Text style={this.styles.buttonText}>Sign {this.state.registerMode ? 'up' : 'in'}</Text>
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...this.iconStyles}
          >
            <Text style={this.styles.buttonText}>Sign {this.state.registerMode ? 'up' : 'in'}</Text>
          </Icon.Button>
        </View>
      </ScrollView>
    );
  }
}
UserForm.propTypes = {
  onSubmit: PropTypes.func,
  navigation: PropTypes.object,
  screenProps: PropTypes.object,
};

export default UserForm;
