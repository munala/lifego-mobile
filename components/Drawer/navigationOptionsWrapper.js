import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default ({ drawerLabel, icon, ReturnComponent }) => (
  class DrawerComponent extends Component {
    static navigationOptions = {
      drawerLabel,
      drawerIcon: (
        <Icon
          type="material-icons"
          name={icon}
          color="#00bcd4"
        />
      ),
    }

    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
      }).isRequired,
    }

    render() {
      return (
        <ReturnComponent navigation={this.props.navigation} />
      );
    }
  }
);
