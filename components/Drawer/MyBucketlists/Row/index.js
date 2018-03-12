import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import RenderRow from './RenderRow';

class Row extends Component {
  state = {
    ...this.props,
    visibleModal: false,
    properties: [],
  };

  componentWillMount = () => {
    this.setState({
      properties: this.renderProperties(),
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ nextProps });
  }

  setModalVisible = (value) => {
    this.setState({
      visibleModal: value,
    });
  }
  handleTouch = () => {
    const { content } = this.state;
    const { navigation } = this.props;
    if (content.userId) {
      navigation.navigate('items', {
        bucketlist: content,
      });
    }
  }
  renderProperties = () => {
    const { content } = this.props;
    const obj = { ...content };
    const properties = [];
    Object.keys(obj).forEach((property) => {
      if (['createdAt', 'updatedAt', 'description'].indexOf(property) >= 0) {
        if (property === 'createdAt' || property === 'updatedAt') {
          obj[property] = Moment(
            obj[property],
          ).format('MMMM Do YYYY, h:mm:ss a');
        }
        properties.push({ name: property, text: obj[property] });
      }
    });
    return properties;
  }
  render() {
    return (
      <RenderRow
        handleTouch={this.handleTouch}
        setModalVisible={this.setModalVisible}
        showModal={this.showModal}
        visibleModal={this.state.visibleModal}
        properties={this.state.properties}
        onDone={this.props.onDone}
        {...this.props}
      />
    );
  }
}

Row.propTypes = {
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }),
  content: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
      })),
    }),
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ]).isRequired,
  showModal: PropTypes.func.isRequired,
  onDone: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
Row.defaultProps = {
  context: {
    type: 'Add',
    name: '',
  },
  onDone: () => {},
};
export default Row;
