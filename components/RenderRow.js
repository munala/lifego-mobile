import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card, Icon, CheckBox } from 'react-native-elements';

export default function render(baseStyles, handleTouch, setModalVisible, bucketlist) {
  const content = this.props.item ? this.props.item : this.props.bucketlist;
  const colors = {
    1: 'rgba(5, 165, 209, 0.95)',
    2: 'rgba(255, 255, 255,0.95)',
  };
  const color = this.colors[this.props.rowNumber === 2 ? 1 : 2];
  const buttons = [
    {
      component: (
        <CheckBox
          checked={content.done}
          onIconPress={() => this.props.onDone(bucketlist, content)}
          containerStyle={{
            backgroundColor: '#fff',
            borderWidth: 0,
          }}
        />
      ),
      backgroundColor: color,
      color: '#273539',
      underlayColor: '#273539',
    },
    {
      component: <Icon name="info" color={color} iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
      color: colors[this.props.rowNumber],
      underlayColor: colors[this.props.rowNumber],
      alignItems: 'center',
      justifyContent: 'center',
      onPress: () => setModalVisible(true),
    },
    {
      component: <Icon name="edit" color={color} iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
      color: colors[this.props.rowNumber],
      underlayColor: colors[this.props.rowNumber],
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
      underlayColor: colors[this.props.rowNumber],
      onPress: () => Alert.alert(
        `Delete ${content.name}`,
        'Are you sure?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK',
            onPress: () => this.props.onDelete(
              bucketlist,
              content,
              {
                name: this.props.item ? 'item' : 'bucketlist',
              }) },
        ],
        { cancelable: true },
      ),


    },
  ];
  const localStyles = StyleSheet.create({
    row: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      justifyContent: 'space-between',
    },
    container: {
      backgroundColor: colors[this.props.rowNumber],
      borderWidth: 0,
      borderRadius: 5,
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
    description: {
      padding: 5,
      color,
      fontSize: 16,
    },
    drag: {
      alignSelf: 'flex-end',
      flexBasis: '5%',
      position: 'absolute',
      justifyContent: 'center',
      top: 0,
      bottom: 0,
      right: 0,
      paddingTop: 7,
    },
    text: {
      lineHeight: 5,
      color,
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
        style={{ backgroundColor: 'transparent', flexDirection: 'row' }}
      >
        <View style={[baseStyles.container, localStyles.row]}>
          <TouchableHighlight
            onPress={() => handleTouch()}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 250 }}
            style={{
              backgroundColor: 'transparent',
              flexBasis: content.done ? '80%' : '95%',
            }}
            underlayColor="transparent"
          >
            <Text
              style={localStyles.description}
              ellipsizeMode="tail"
              numberOfLines={3}
            >
              {`${content.description || 'No description'}`}
            </Text>
          </TouchableHighlight>
          {
            content.done &&
            <Icon
              name="done"
              size={40}
              color={color}
              style={{ width: 50, height: 50, flexBasis: '15%' }}
            />
          }
          <View style={localStyles.drag}>
            <Text style={localStyles.text}>..{'\n'}..{'\n'}..{'\n'}..</Text>
          </View>
        </View>
      </Swipeout>
    </Card>
  );
}
