import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
});
