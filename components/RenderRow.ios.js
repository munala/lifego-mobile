import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default function render(baseStyles, handleTouch) {
  const content = this.props.bucketlist ? this.props.bucketlist : this.props.item;
  const buttons = [
    {
      text: 'Done',
      backgroundColor: '#eaeaea',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => this.props.onDone(this.props.navigation.state.params.bucketlist, content),
    },
    {
      text: 'Info',
      backgroundColor: 'cyan',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => this.props.info(content),
    },
    {
      text: 'Edit',
      backgroundColor: 'yellow',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => {
        this.props.navigation.navigate('bucketlistform', {
          context: {
            name: this.props.bucketlist ? 'bucketlist' : 'item',
            type: 'Edit',
            content,
            bucketlist: this.props.navigation.state.params.bucketlist,
          },
        });
      },
    },
    {
      text: 'Delete',
      backgroundColor: 'red',
      color: '#fff',
      underlayColor: '#273539',
      onPress: () => this.props.onDelete(
        (content.items ? content : this.props.navigation.state.params.bucketlist),
        content,
        {
          name: this.props.bucketlist ? 'bucketlist' : 'item',
        }),
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
        autoClose
        backgroundColor="#fff"
        right={this.props.item ? buttons : buttons.splice(1, 3)}
      >
        <View style={[baseStyles.container, localStyles.row]}>
          <TouchableHighlight onPress={() => handleTouch(content)}>
            <Text style={baseStyles.label}>
              {`${content.name}`}
            </Text>
          </TouchableHighlight>
        </View>
      </Swipeout>
    </View>

  );
}
