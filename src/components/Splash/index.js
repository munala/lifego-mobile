/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  AsyncStorage,
  Animated,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

import { navigate } from '../../actions/navigationActions';
import { login } from '../../actions/userActions';
import styles from './styles';

class Splash extends Component {
  state = {
    value: new Animated.Value(0),
    marginBottom1: new Animated.Value(1),
    rotate1: new Animated.Value(1),
    marginBottom2: new Animated.Value(1),
    rotate2: new Animated.Value(1),
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
      this.props.actions.navigate({
        route,
        navigator:
        'AuthNavigator',
      });
    }, 2000);
    this.animate('1');
    setTimeout(() => {
      this.animate('2');
    }, 250);
  }

  nestedAnimation = number => Animated.sequence([
    Animated.timing(this.state[`marginBottom${number}`], {
      toValue: 0,
      duration: 1000,
    }),
    Animated.timing(this.state[`marginBottom${number}`], {
      toValue: 1,
      duration: 1000,
    }),
  ]).start();


  animate = (number) => {
    Animated.parallel([
      Animated.sequence([
        this.nestedAnimation(number),
        this.nestedAnimation(number),
      ]),
      Animated.sequence([
        Animated.timing(this.state[`rotate${number}`], {
          toValue: 0,
          duration: 2000,
        }),
        Animated.timing(this.state[`rotate${number}`], {
          toValue: 1,
          duration: 2000,
        }),
      ]).start(() => {
        this.animate(number);
      }),
    ]);
  }

  render = () => {
    const bottom = this.state.marginBottom1.interpolate({
      inputRange: [0, 1],
      outputRange: [-460, -510],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const bottom2 = this.state.marginBottom2.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, -300],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const rotate = this.state.rotate1.interpolate({
      inputRange: [0, 1],
      outputRange: ['5deg', '-5deg'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const marginLeft = this.state.rotate2.interpolate({
      inputRange: [0, 1],
      outputRange: ['-80%', '80%'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const rotate2 = this.state.rotate1.interpolate({
      inputRange: [0, 1],
      outputRange: ['-5deg', '5deg'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const marginLeft2 = this.state.rotate2.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90%', '90%'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/splash_background.jpg')}
        />
        <Animated.View style={[styles.rectangle, {
          bottom,
          marginLeft,
          transform: [{ rotate }],
          backgroundColor: 'rgba(255,255,255,0.5)',
        }]}
        />
        <Animated.View style={[styles.rectangle, {
          bottom: bottom2,
          marginLeft: marginLeft2,
          transform: [{ rotate: rotate2 }],
          backgroundColor: 'rgba(0,188,212,0.5)',
        }]}
        />
      </View>
    );
  }
}

Splash.propTypes = {
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, dispatch => ({
  actions: bindActionCreators({ navigate, login }, dispatch),
}))(Splash);
