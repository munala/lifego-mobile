import React from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, Image, AsyncStorage } from 'react-native';

export default function MenuComponent(logout, reset) {
  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ededed',
    },
    image: {
      opacity: 0.3,
      backgroundColor: '#fff',
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderWidth: 0,
      height: 70,
      justifyContent: 'center',
    },
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../images/bucketlist_front.jpg')}
        blurRadius={10}
      />
      <List containerStyle={{ marginBottom: 20 }}>
        <ListItem
          style={styles.item}
          onPress={() => { AsyncStorage.setItem('first_run', 'false').then(() => { logout(); reset(); }); }}
          key={'logout'}
          title="Logout"
        />
      </List>
    </View>
  );
}
