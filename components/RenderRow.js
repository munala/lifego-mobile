import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default function render(baseStyles, handleTouch, setModalVisible, bucketlist) {
  const content = this.props.item ? this.props.item : this.props.bucketlist;
  const buttons = [
    {
      text: content.done ? 'Undo' : 'Do',
      backgroundColor: '#eaeaea',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => this.props.onDone(bucketlist, content),
    },
    {
      text: 'Info',
      backgroundColor: 'cyan',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => setModalVisible(true),
    },
    {
      text: 'Edit',
      backgroundColor: 'yellow',
      color: '#273539',
      underlayColor: '#273539',
      onPress: () => {
        this.props.navigation.navigate('bucketlistform', {
          context: {
            name: this.props.item ? 'item' : 'bucketlist',
            type: 'Edit',
            content,
            bucketlist,
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
        bucketlist,
        content,
        {
          name: this.props.item ? 'item' : 'bucketlist',
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
          <TouchableHighlight
            onPress={() => handleTouch()}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 250 }}
          >
            <Text style={baseStyles.label}>
              {`${content.name}`}
            </Text>
          </TouchableHighlight>
          {
            (content.done ||
              (content.userId && content.items && content.items.length > 0 &&
                content.items.filter(item => item.done).length === content.items.length
              )
            ) &&
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../images/done.png')}
            />
          }
        </View>
      </Swipeout>
    </View>
  );
}
