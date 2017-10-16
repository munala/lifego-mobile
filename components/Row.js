import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Platform,
  StyleSheet,
} from 'react-native';

import RenderAndroid from './RenderRow.android';
import RenderIos from './RenderRow.ios';

class Row extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleTouch = this.handleTouch.bind(this);
    this.renderProperties = this.renderProperties.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      modalVisible: false,
    };
    this.styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 70,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#05A5D1',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      label: {
        padding: 5,
        color: '#fafafa',
        fontSize: 20,
        fontWeight: '600',
      },
      doneButton: {
        padding: 5,
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 5,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#aaaaaa',
        height: 50,
        paddingTop: 10,
      },
    });
    this.content = this.props.bucketlist ? this.props.bucketlist : this.props.item;
  }
  componentWillReceiveProps(nextProps) {
    this.content = nextProps.bucketlist ? nextProps.bucketlist : nextProps.item;
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleTouch(bucketlist) {
    if (this.props.bucketlist) {
      this.props.navigation.navigate('items', {
        bucketlist,
      });
    }
  }
  renderProperties() {
    const properties = [];
    Object.keys(this.content).forEach((property) => {
      if (['name', 'createdAt', 'updatedAt'].indexOf(property) >= 0) {
        if (property === 'createdAt' || property === 'updatedAt') {
          properties.push({
            name: property,
            value: require('moment')(
              this.content[property],
            ).format('MMMM Do YYYY, h:mm:ss a'),
          });
        }
        properties.push({ name: property, value: this.content[property] });
      }
    });
    return properties.map(property => (
      <Text key={property.name} style={this.styles.text}>{property.name}: {property.value}</Text>
    ));
  }
  render() {
    const Render = Platform.OS === 'ios' ? RenderIos : RenderAndroid;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              {
                this.renderProperties()
              }

              <TouchableHighlight
                style={this.styles.doneButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {Render.bind(this)(this.styles, this.handleTouch, this.setModalVisible)}
      </View>
    );
  }
}

Row.propTypes = {
  bucketlist: PropTypes.object,
  item: PropTypes.object,
  navigation: PropTypes.object,
};

export default Row;
