import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bcd4',
    justifyContent: 'flex-start',
  },
  bucketlistRow: {
    flex: 1,
    margin: 10,
  },
  image: {
    opacity: 0.8,
    backgroundColor: '#aaa',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    shadowOpacity: 0,
  },
  empty: {
    height: 40,
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  modal: {
    backgroundColor: 'transparent',
    marginTop: 100,
    position: 'absolute',
    alignSelf: 'center',
    width: '80%',
  },
});
