import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableHighlight,
} from 'react-native';

export default function render(baseStyles) {
  const doneAnimation = new Animated.ValueXY();
  const localStyles = StyleSheet.create({
    doneButton: {
      borderRadius: 5,
      padding: 5,
    },
    doneImage: {
      width: 50,
      height: 50,
    },
    row: {
      transform: doneAnimation.getTranslateTransform(),
    },
  });
  const animatedPress = () => {
    Animated.spring(doneAnimation, {
      tension: 2,
      friction: 3,
      toValue: {
        x: -500,
        y: 0,
      },
    }).start();
    setTimeout(() => {
      this.props.onDone(this.props.bucketlist);
    }, 500);
  };
  animatedPress.bind(this);
  return (
    <Animated.View style={[baseStyles.container, localStyles.row]}>
      <Text style={baseStyles.label}>
        {this.props.bucketlist.name}
      </Text>
      <TouchableHighlight
        onPress={animatedPress}
        style={localStyles.doneButton}
        underlayColor="#ddd"
      >
        <Image source={require('../images/done.png')} style={localStyles.doneImage} />
      </TouchableHighlight>
    </Animated.View>
  );
}
