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
import Modal from 'react-native-modal';

export default function render(baseStyles, handleTouch, setModalVisible) {
  const content = this.props.content;
  const buttons = [
    {
      component: (
        <CheckBox
          checked={content.done}
          onIconPress={() => this.props.onDone(this.props.context.bucketlist, content)}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            marginRight: 5,
            marginVertical: 0,
          }}
          checkedColor="#00bcd4"
          uncheckedColor="#00bcd4"
        />
      ),
      backgroundColor: 'transparent',
      color: '#273539',
      underlayColor: '#273539',
    },
    {
      component: <Icon name="info" color="#00bcd4" iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
      color: '#00bcd4',
      underlayColor: '#00bcd4',
      alignItems: 'center',
      justifyContent: 'center',
      onPress: () => setModalVisible(true),
    },
    {
      component: <Icon name="edit" color="#00bcd4" iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
      color: '#00bcd4',
      underlayColor: '#00bcd4',
      onPress: () => this.props.showModal('Edit', content),
    },
    {
      component: <Icon name="delete" color="red" iconStyle={{ marginTop: 15 }} />,
      backgroundColor: 'transparent',
      color: '#fff',
      underlayColor: '#00bcd4',
      onPress: () => Alert.alert(
        `Delete ${content.name}`,
        'Are you sure?',
        [
          { text: 'Cancel', onPress: () => {} },
          { text: 'OK',
            onPress: () => this.props.onDelete(content, this.props.context) },
        ],
        { cancelable: true },
      ),
    },
  ];

  const localStyles = StyleSheet.create({
    row: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255,0.95)',
      borderWidth: 0,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
    },
    swipeout: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#00bcd4',
    },
    divider: {
      backgroundColor: '#00bcd4',
    },
    label: {
      padding: 5,
      color: '#00bcd4',
      fontSize: 20,
      fontWeight: '600',
    },
    description: {
      padding: 5,
      color: '#00bcd4',
      fontSize: 16,
    },
    drag: {
      flexBasis: '5%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginTop: 7,
      alignSelf: 'stretch',
      flex: 1,
      flexDirection: 'row',
      lineHeight: 5,
      color: '#00bcd4',
      fontWeight: '600',
    },
    modal: {
      backgroundColor: 'transparent',
      marginTop: 50,
      position: 'absolute',
      alignSelf: 'center',
      width: '90%',
    },
    card: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: '#f7f7f7',
      borderRadius: 5,
    },
    detailRow: {
      flexBasis: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      height: '20%',
      marginTop: 5,
      marginBottom: 5,
    },
    property: {
      borderRadius: 5,
      flexDirection: 'row',
      flexBasis: '80%',
      fontWeight: '600',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 5,
    },
    propertyValue: {
      flexBasis: '80%',
    },
    button: {
      marginTop: 5,
      borderRadius: 5,
      flexDirection: 'row',
      flexBasis: '45%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      backgroundColor: '#666',
    },
  });

  return (
    <Card
      containerStyle={localStyles.container}
      title={this.props.content.name}
      titleStyle={localStyles.title}
      dividerStyle={localStyles.divider}
    >
      <Modal
        isVisible={this.state.visibleModal}
        backdropColor={'black'}
        backdropOpacity={0.5}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={200}
        animationOutTiming={200}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        style={localStyles.modal}
      >
        <Card
          containerStyle={localStyles.card}
          title={content.name}
          titleStyle={{ color: 'rgb(5, 165, 209)' }}
          dividerStyle={{ backgroundColor: 'rgb(5, 165, 209)' }}
        >
          {
            this.state.properties.map(property => (
              <View style={localStyles.detailRow} key={property.name}>
                <Text style={localStyles.property}>{property.name}:</Text>
                <Text style={localStyles.propertyValue}>{property.text}</Text>
              </View>
            ))
          }
          <TouchableHighlight
            style={localStyles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableHighlight>
        </Card>
      </Modal>
      <Swipeout
        autoClose
        right={!content.userId ? buttons : buttons.splice(1, 3)}
        style={localStyles.swipeout}
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
              color="#00bcd4"
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
