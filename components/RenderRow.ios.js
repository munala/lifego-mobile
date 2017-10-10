import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default function render(baseStyles) {
  const buttons = [
    {
      text: 'Done',
      backgroundColor: '#eaeaea',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => this.props.onDone(this.props.bucketlist),
    },
  ];
  const localStyles = StyleSheet.create({
    row: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    container: {
      marginBottom: 10,
    },
  });
  return (
    <View style={localStyles.container}>
      <Swipeout
        backgroundColor="#fff"
        right={buttons}
      >
        <View style={[baseStyles.container, localStyles.row]}>
          <Text style={baseStyles.label}>
            {this.props.bucketlist.name}
          </Text>
        </View>
      </Swipeout>
    </View>

  );
}
