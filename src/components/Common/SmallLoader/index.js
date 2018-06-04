import React, { Component } from 'react';
import {
  Animated,
  View,
} from 'react-native';

class SmallLoader extends Component {
  state = {
    backgroundColor: new Animated.Value(0),
    diameter: new Animated.Value(0),
  }

  componentDidMount = () => {
    this.animate();
  }

  animate = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.state.backgroundColor, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(this.state.backgroundColor, {
          toValue: 0,
          duration: 200,
        }),
      ]),
      Animated.sequence([
        Animated.timing(this.state.diameter, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(this.state.diameter, {
          toValue: 0,
          duration: 200,
        }),
      ]),
    ]).start(() => {
      this.animate();
    });
  }

  render() {
    const diameter = this.state.diameter.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 10],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const borderRadius = this.state.diameter.interpolate({
      inputRange: [0, 1],
      outputRange: [2.5, 5],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const backgroundColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['white', '#f7f7f7', '#00bcd4'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const style = {
      display: 'flex',
      height: diameter,
      width: diameter,
      borderRadius,
      backgroundColor,
    };

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: 10,
      margin: 5,
    };

    return (
      <View style={containerStyle}>
        <Animated.View style={style} />
      </View>
    );
  }
}

export default SmallLoader;
