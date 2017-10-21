import React from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, Image } from 'react-native';

export default function MenuComponent(logout) {
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
          onPress={logout}
          key={'logout'}
          title="Logout"
        />
      </List>
    </View>
  );
}
