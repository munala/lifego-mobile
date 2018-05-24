import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, ViewPropTypes, View } from 'react-native';

import Text from '../SuperText';
import styles from './styles';

class Dialog extends Component {
  state = {
    value: new Animated.Value(0),
  }

  componentDidMount = () => {
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  onCancel = () => {
    Animated.timing(this.state.value, {
      toValue: 0,
      duration: 200,
    }).start();
    setTimeout(() => {
      this.props.onCancel();
    }, 200);
  }

  renderButtons = () => this.props.buttons.map(({ label, action }) => (
    <TouchableOpacity onPress={action} style={styles.button} key={label}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  ))

  render() {
    const bottom = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 10],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    return (
      <Animated.View style={[{ bottom }, this.props.style || styles.container]}>
        <Text style={styles.text}>{this.props.text}</Text>
        <View style={styles.buttonGroup}>
          {this.renderButtons()}
          {
            this.props.cancelable &&
            <TouchableOpacity onPress={this.onCancel} style={styles.button}>
              <Text style={[styles.label, { color: 'grey' }]}>Cancel</Text>
            </TouchableOpacity>
          }
        </View>
      </Animated.View>
    );
  }
}

Dialog.propTypes = {
  text: PropTypes.string.isRequired,
  cancelable: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  })).isRequired,
  style: ViewPropTypes.style,
};

Dialog.defaultProps = {
  style: null,
};

export default Dialog;
