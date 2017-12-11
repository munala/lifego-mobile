import React from 'react';
import { List, ListItem, Icon } from 'react-native-elements';
import { View, AsyncStorage } from 'react-native';

export default function MenuComponent(logout, reset) {
  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ededed',
      marginTop: 0,
      paddingVertical: 0,
    },
    item: {
      backgroundColor: 'rgba(255,255,255,1)',
      borderWidth: 0,
      marginTop: 0,
      paddingVertical: 0,
      height: 70,
      justifyContent: 'center',
    },
    list: {
      marginBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      marginTop: 0,
    },
  };
  return (
    <View style={styles.container}>
      <List containerStyle={styles.list}>
        <ListItem
          containerStyle={styles.item}
          titleStyle={{ color: '#00bcd4' }}
          onPress={() => { AsyncStorage.setItem('first_run', 'false').then(() => { logout(); reset(); }); }}
          key={'logout'}
          title="Logout"
          rightIcon={<Icon name="exit-to-app" type="material-icons" color="#00bcd4" />}
        />
      </List>
    </View>
  );
}
