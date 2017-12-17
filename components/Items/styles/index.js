import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bcd4',
    justifyContent: 'flex-start',
  },
  empty: {
    height: 40,
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  bucketlistRow: {
    flex: 1,
    margin: 20,
    opacity: 0,
  },
  toggleRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  toggleText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 3,
    backgroundColor: 'transparent',
    color: '#fff',
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
  },
  switch: {
    backgroundColor: 'transparent',
  },
  modal: {
    backgroundColor: 'transparent',
    marginTop: 100,
    position: 'absolute',
    alignSelf: 'center',
    width: '80%',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00bcd4',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
