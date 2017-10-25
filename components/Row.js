import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Alert,
  AlertIOS,
  Platform,
} from 'react-native';

import RenderRow from './RenderRow';

class Row extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleTouch = this.handleTouch.bind(this);
    this.renderProperties = this.renderProperties.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = this.props;
    this.colors = { 1: '#05A5D1', 2: '#fff' };
    this.styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
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
        paddingTop: 10,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ nextProps });
  }
  setModalVisible() {
    (Platform.OS === 'ios' ? AlertIOS : Alert).alert(`${this.state.content.name}`, this.renderProperties());
  }
  handleTouch() {
    if (this.state.content.userId) {
      this.props.navigation.navigate('items', {
        bucketlist: this.state.content,
      });
    }
  }
  renderProperties() {
    let properties = '';
    Object.keys(this.state.content).forEach((property) => {
      if (['createdAt', 'updatedAt', 'description'].indexOf(property) >= 0) {
        properties = `${properties} ${property} : ${
          (property === 'createdAt' || property === 'updatedAt') ? require('moment')(
            this.state.content[property],
          ).format('MMMM Do YYYY, h:mm:ss a') : this.state.content[property]
        }\n`;
      }
    });
    return properties;
  }
  render() {
    return RenderRow.bind(this)(
      this.styles,
      this.handleTouch,
      this.setModalVisible,
      this.showModal,
    );
  }
}

Row.propTypes = {
  bucketlist: PropTypes.object,
  item: PropTypes.object,
  navigation: PropTypes.object,
  rowNumber: PropTypes.number,
};

export default Row;
