/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Linking,
  View,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import styles from './styles';

const iconStyles = {
  borderRadius: 20,
  paddingLeft: 20,
  paddingRight: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  iconStyle: {
    display: 'flex',
    alignItems: 'center',
  },
};

class User extends Component {
  static navigationOptions = () => ({
    title: 'Login',
    header: null,
  });

  state = {
    registerMode: false,
    disabled: true,
    isLoading: false,
    loginUser: {
      email: '',
      password: '',
    },
    registerUser: {
      displayName: '',
      email: '',
      password: '',
    },
  };

  componentDidMount = async () => {
    Linking.addEventListener('url', this.handleOpenURL);
    const url = await Linking.getInitialURL();
    const start = await AsyncStorage.getItem('start');
    if (url) {
      this.handleOpenURL({ url });
    }
    if (this.props.loggedIn && start === 'true') {
      this.props.navigation.navigate('home');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { loggedIn, navigation, error } = nextProps;
    if (loggedIn === true && loggedIn !== this.props.loggedIn) {
      navigation.navigate('home');
    } else if (error) {
      if (error !== 'Unauthorised' || error !== 'Invalid token') {
        Alert.alert(error);
      }
    }
  }

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  onSubmit = () => {
    if (this.state.registerMode) {
      this.props.actions.register(this.state.registerUser);
    } else {
      this.props.actions.login(this.state.loginUser);
    }
  }

  onChange = (type, text) => {
    const { registerMode, registerUser, loginUser } = this.state;
    const user = registerMode ? registerUser : loginUser;
    user[type] = (type === 'password' || type === 'confirm') ? text : text.trim();
    let disabled = false;
    Object.keys(user).forEach((key) => {
      if (user[key].length === 0) {
        disabled = true;
      }
    });
    this.setState({ disabled, loginUser, registerUser });
  }

  onToggle = () => {
    this.setState({
      registerMode: !this.state.registerMode,
      disabled: !this.state.registerMode ? true : this.state.disabled,
    });
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

  render() {
    const { registerMode, registerUser, loginUser, disabled } = this.state;
    const user = registerMode ? registerUser : loginUser;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
      >
        <Image
          style={styles.image}
          source={require('../../images/bucketlist_front.jpg')}
        />
        <Image
          style={{
            height: 80,
            width: 80,
            alignSelf: 'center',
            marginBottom: 50,
          }}
          source={require('../../assets/icons/icon.png')}
        />
        {
          registerMode &&
          <TextInput
            ref={(element) => { this.DisplayName = element; }}
            defaultValue={user.displayName}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.input}
            placeholderTextColor="#eee"
            onChangeText={value => this.onChange('displayName', value)}
            placeholder="full name"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.Email.focus();
            }}
          />}
        <TextInput
          ref={(element) => { this.Email = element; }}
          autoCapitalize="none"
          keyboardType="email-address"
          defaultValue={user.email}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          onChangeText={value => this.onChange('email', value)}
          placeholder="example@me.com"
          returnKeyType="next"
          onSubmitEditing={() => {
            this.Password.focus();
          }}
        />
        <TextInput
          ref={(element) => { this.Password = element; }}
          defaultValue={user.password}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          secureTextEntry
          onChangeText={value => this.onChange('password', value)}
          placeholder="password"
          returnKeyType={registerMode ? 'next' : 'done'}
          onSubmitEditing={() => (registerMode ? this.Confirm.focus() : null)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmit}
          disabled={disabled}
          underlayColor="#00bcd4"
        >
          {
            this.props.currentApiCalls > 0 ?
              <ActivityIndicator color="#fff" size="large" /> :
              <Text style={styles.buttonText}>Sign {registerMode ? 'up' : 'in'}</Text>
          }
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.cancelButton]}
          onPress={this.onToggle}
          underlayColor="transparent"
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>{registerMode ? 'Already a member?' : 'Need an account?'}</Text>
        </TouchableHighlight>
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            <Text style={styles.buttonText}>Continue with Google</Text>
          </Icon.Button>
        </View>
      </ScrollView>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    socialLogin: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
