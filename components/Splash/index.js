/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  AsyncStorage,
  Animated,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

import { navigate } from '../../actions/navigationActions';
import styles from './styles';

class Splash extends Component {
  state = {
    value: new Animated.Value(0),
  }

  componentDidMount = async () => {
    let route;
    const token = await AsyncStorage.getItem('token');
    const notFirstTime = await AsyncStorage.getItem('notFirstTime');
    if (!notFirstTime) {
      route = 'intro';
    } else if (!token || jwtDecode(token).exp < Date.now() / 1000) {
      route = 'user';
      AsyncStorage.removeItem('token');
    } else {
      route = 'home';
    }
    setTimeout(() => {
      this.props.actions.navigate({ route, navigator: 'auth' });
    }, 2000);
    this.animate();
  }

  animate = () => {
    Animated.sequence([
      Animated.timing(this.state.value, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.value, {
        toValue: 0,
        duration: 500,
      }),
    ]).start(() => {
      this.animate();
    });
  }

  render = () => {
    const height = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 250],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const borderRadius = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 125],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    return (
      <View style={styles.container}>
        <Text style={styles.title}>LifeGo</Text>
        <Animated.View style={[
          styles.logoContainer,
          {
            height,
            width: height,
            borderRadius,
          }]}
        >
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require('../../assets/icons/icon.png')}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

Splash.propTypes = {
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, dispatch => ({
  actions: bindActionCreators({ navigate }, dispatch),
}))(Splash);
