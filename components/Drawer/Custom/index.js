import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DrawerItems } from 'react-navigation';
import { View } from 'react-native';

import Text from '../../Common/SuperText';
import Account from './Account';
import styles from './styles';

class CustomDrawer extends Component {
  static propTypes = {
    activeItemKey: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
  }

  componentDidUpdate = ({ activeItemKey, route, navigate }) => {
    if (this.mounted === true) {
      if (activeItemKey !== route) {
        navigate({ route: activeItemKey, navigator: 'drawer' });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Account />
          <DrawerItems {...this.props} />
        </View>
        <Text style={styles.copyright}>© 2018 Oliver Munala</Text>
      </View>
    );
  }
}
export default CustomDrawer;
