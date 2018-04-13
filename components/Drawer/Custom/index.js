import React from 'react';
import { DrawerItems } from 'react-navigation';
import { View } from 'react-native';

import Text from '../../Common/SuperText';
import Account from './Account';
import styles from './styles';

const CustomDrawer = props => (
  <View style={styles.container}>
    <View>
      <Account />
      <DrawerItems {...props} />
    </View>
    <Text style={styles.copyright}>© 2018 Oliver Munala</Text>
  </View>
);

export default CustomDrawer;
