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
import * as userActions from '../../actions/authActions';
import styles from './styles';

const iconStyles = {
  borderRadius: 10,
  paddingLeft: 20,
  paddingRight: 20,
  iconStyle: {
    paddingVertical: 5,
    flexBasis: '10%',
  },
};

let token;

class User extends Component {
    static navigationOptions = () => ({
      title: 'Login',
      header: null,
    });

    state = {
      registerMode: false,
      disabled: true,
      isLoading: false,
      user: {
        username: '',
        email: '',
        password: '',
        confirm: '',
        social: false,
      },
    };
  componentWillMount = async () => {
    const { navigation, error } = this.props;
    token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('bucketlist');
    }
    Linking.addEventListener('url', this.handleOpenURL);
    const url = await Linking.getInitialURL();
    if (url) {
      this.handleOpenURL({ url });
    }
    if (error.value) {
      Alert.alert(error.value);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { auth, navigation } = nextProps;
    if (nextProps.auth.loggedIn !== this.props.auth.loggedIn) {
      if (auth.loggedIn) {
        navigation.navigate('bucketlist');
      }
    }
  }

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  onSubmit = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
    if (this.state.registerMode) {
      this.props.actions.register(this.state.user);
    } else {
      this.props.actions.login(this.state.user);
    }
  }

  onChange = (type, text) => {
    const user = { ...this.state.user };
    user[type] = (type === 'password' || type === 'confirm') ? text : text.trim();
    let disabled = false;
    if (!this.state.registerMode) {
      delete user.email;
      delete user.confirm;
      delete user.avatar;
      delete user.social;
      delete user.name;
    }
    Object.keys(user).forEach((key) => {
      if (this.state.user[key].length === 0) {
        disabled = true;
      }
    });
    this.setState({ disabled, user });
  }

  onToggle = () => {
    this.setState({
      registerMode: !this.state.registerMode,
      disabled: !this.state.registerMode ? true : this.state.disabled,
    });
  }

  handleOpenURL = async ({ url }) => {
    const [, userString] = url.match(/user=([^#]+)/);
    await this.setState({
      user: {
        ...JSON.parse(decodeURI(userString)),
        password: JSON.parse(decodeURI(userString)).username,
        confirm: JSON.parse(decodeURI(userString)).username,
        social: true,
      },
    });
    this.onSubmit();
  }
  loginWithFacebook = () => this.openURL('https://bucketlist-node.herokuapp.com/auth/facebook');

  loginWithGoogle = () => this.openURL('https://bucketlist-node.herokuapp.com/auth/google')

  openURL = (url) => {
    Linking.openURL(url);
  };

  render() {
    if (this.props.currentApiCalls > 0) {
      return <View style={[styles.activity, styles.horizontal]}><ActivityIndicator color="#fff" size="large" /></View>;
    }
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
        <TextInput
          autoFocus
          autoCapitalize="none"
          defaultValue={this.state.user.username}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          onChangeText={value => this.onChange('username', value)}
          placeholder="username"
          returnKeyType="next"
          onSubmitEditing={() => {
            if (this.state.registerMode) {
              this.Email.focus();
            } else {
              this.Password.focus();
            }
          }}
        />
        {
          this.state.registerMode &&
          <TextInput
            ref={(element) => { this.Email = element; }}
            keyboardType="email-address"
            defaultValue={this.state.user.email}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.input}
            placeholderTextColor="#eee"
            onChangeText={value => this.onChange('email', value)}
            placeholder="example@me.com"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.Password.focus();
            }}
          />}
        <TextInput
          ref={(element) => { this.Password = element; }}
          defaultValue={this.state.user.password}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          secureTextEntry
          onChangeText={value => this.onChange('password', value)}
          placeholder="password"
          returnKeyType={this.state.registerMode ? 'next' : 'done'}
          onSubmitEditing={() => (this.state.registerMode ? this.Confirm.focus() : null)}
        />
        {
          this.state.registerMode &&
          <TextInput
            ref={(element) => { this.Confirm = element; }}
            defaultValue={this.state.user.confirm}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.input}
            placeholderTextColor="#eee"
            secureTextEntry
            onChangeText={value => this.onChange('confirm', value)}
            placeholder="confirm"
            returnKeyType="done"
          />
        }
        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmit}
          disabled={this.state.disabled}
        >
          <Text style={styles.buttonText}>Sign {this.state.registerMode ? 'up' : 'in'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.cancelButton]}
          onPress={this.onToggle}
          underlayColor="#eee"
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>{this.state.registerMode ? 'Already a member?' : 'Need an account?'}</Text>
        </TouchableHighlight>
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            <Text style={styles.buttonText}>Sign {this.state.registerMode ? 'up' : 'in'}</Text>
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            <Text style={styles.buttonText}>Sign {this.state.registerMode ? 'up' : 'in'}</Text>
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
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
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
