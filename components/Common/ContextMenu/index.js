import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, ViewPropTypes } from 'react-native';

import Text from '../SuperText';
import styles from './styles';

class ContextMenu extends Component {
  state = {
    value: new Animated.Value(0),
  }

  componentDidMount = () => {
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  renderItems = () => this.props.items.map(({ label, action }) => (
    <TouchableOpacity onPress={action} style={styles.button} key={label}>
      <Text style={[styles.label, label.toLowerCase() === 'delete' && { color: 'red' }]}>{label}</Text>
    </TouchableOpacity>
  ))

  render() {
    const bottom = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [(-50 * this.props.items.length) + 10, 10],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const height = 50 * this.props.items.length;

    return (
      <Animated.View style={[{ bottom, height }, this.props.style || styles.container]}>
        {this.renderItems()}
      </Animated.View>
    );
  }
}

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  })).isRequired,
  style: ViewPropTypes.style,
};

ContextMenu.defaultProps = {
  style: null,
};

export default ContextMenu;
