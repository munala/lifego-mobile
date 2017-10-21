import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card, Icon, CheckBox } from 'react-native-elements';

export default function render(baseStyles, handleTouch, setModalVisible, bucketlist) {
  const content = this.props.item ? this.props.item : this.props.bucketlist;
  const colors = {
    1: 'rgba(5, 165, 209, 0.7)',
    2: 'rgba(187, 187, 187,0.7)',
    3: 'rgba(255, 255, 255,0.7)',
  };
  const color = this.colors[this.props.rowNumber === 3 ? 1 : 3];
  const buttons = [
    {
      component: (
        <CheckBox
          checked={content.done}
          onIconPress={() => this.props.onDone(bucketlist, content)}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
        />
      ),
      backgroundColor: 'transparent',
      color: '#273539',
      underlayColor: '#273539',
    },
    {
      component: <Icon name="info" color={color} iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
      color: '#273539',
      underlayColor: '#273539',
      alignItems: 'center',
      justifyContent: 'center',
      onPress: () => setModalVisible(true),
    },
    {
      component: <Icon name="edit" color={color} iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
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
      component: <Icon name="delete" color="red" iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
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
      backgroundColor: colors[this.props.rowNumber],
      borderWidth: 0,
    },
    title: {
      color,
    },
    divider: {
      backgroundColor: color,
    },
    label: {
      padding: 5,
      color,
      fontSize: 20,
      fontWeight: '600',
    },
  });
  return (
    <Card
      containerStyle={localStyles.container}
      title={content.name}
      titleStyle={localStyles.title}
      dividerStyle={localStyles.divider}
    >
      <Swipeout
        autoClose
        right={this.props.item ? buttons : buttons.splice(1, 3)}
        style={{ backgroundColor: 'transparent' }}
      >
        <View style={[baseStyles.container, localStyles.row]}>
          <TouchableHighlight
            onPress={() => handleTouch()}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 250 }}
            style={{ backgroundColor: 'transparent' }}
          >
            <Text style={localStyles.label}>
              {`${content.name}`}
            </Text>
          </TouchableHighlight>
          {
            (content.done ||
              (content.userId && content.items && content.items.length > 0 &&
                content.items.filter(item => item.done).length === content.items.length
              )
            ) &&
            <Icon
              name="done"
              size={40}
              color={color}
              style={{ width: 50, height: 50, alignSelf: 'center' }}
            />
          }
        </View>
      </Swipeout>
    </Card>
  );
}
