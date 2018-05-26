import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { navigate } from '../../../../actions/navigationActions';
import styles from '../styles';

class DrawerItems extends Component {
  navigateToScreen = (route) => {
    this.props.navigate({
      route,
      navigator: 'DrawerNav',
      params: { fromRoute: undefined },
    });
    this.props.navigate({ route: 'DrawerClose', navigator: 'DrawerNav' });
  }

  render() {
    const displayNames = {
      Home: 'Home',
      Bucketlists: 'My Lists',
      Profile: 'Profile',
      Settings: 'Settings',
    };

    const iconNames = {
      Home: 'home',
      Bucketlists: 'list',
      Profile: 'person',
      Settings: 'settings',
    };

    const { activeItemKey, navigation: { state: { routes } } } = this.props;

    return routes.map(route => (
      <TouchableOpacity
        key={route.key}
        onPress={() => this.navigateToScreen(route.routeName)}
        style={[styles.route, activeItemKey === route.key && styles.activeBackground]}
      >
        <Icon
          type="material-icons"
          name={iconNames[route.routeName]}
          color="#00bcd4"
        />
        <Text style={[styles.routeName, activeItemKey === route.key && styles.active]}>
          {displayNames[route.routeName]}
        </Text>
      </TouchableOpacity>
    ));
  }
}

DrawerItems.propTypes = {
  navigate: PropTypes.func.isRequired,
  activeItemKey: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        routeName: PropTypes.string,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(
  null,
  dispatch => bindActionCreators({ navigate }, dispatch),
)(DrawerItems);
