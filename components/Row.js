import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

import RenderRow from './RenderRow';

class Row extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleTouch = this.handleTouch.bind(this);
    this.renderProperties = this.renderProperties.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      modalVisible: false,
      content: this.props.item ? this.props.item : this.props.bucketlist,
      bucketlist: this.props.bucketlist,
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
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.item ? nextProps.item : nextProps.bucketlist,
      bucketlist: nextProps.bucketlist,
    });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleTouch() {
    if (this.state.content.items) {
      this.props.navigation.navigate('items', {
        bucketlist: this.props.bucketlist,
      });
    }
  }
  renderProperties() {
    const properties = [];
    Object.keys(this.state.content).forEach((property) => {
      if (['name', 'createdAt', 'updatedAt'].indexOf(property) >= 0) {
        if (property === 'createdAt' || property === 'updatedAt') {
          properties.push({
            name: property,
            value: require('moment')(
              this.state.content[property],
            ).format('MMMM Do YYYY, h:mm:ss a'),
          });
        } else {
          properties.push({ name: property, value: this.state.content[property] });
        }
      }
    });
    return properties.map(property => (
      <Text key={property.name} style={this.styles.text}>{property.name}: {property.value}</Text>
    ));
  }
  render() {
    if (this.state.content.item) {
      console.log({ done: this.state.content.item.done });
    }
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
        {RenderRow.bind(this)(
          this.styles, this.handleTouch, this.setModalVisible, this.state.bucketlist,
        )}
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
