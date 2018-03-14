import { StyleSheet, Platform, Dimensions } from 'react-native';

const scaleX = Platform.OS === 'ios' ? 0.5 : 1;
const scaleY = scaleX;
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bcd4',
    justifyContent: 'flex-start',
  },
  iPhoneX: {
    paddingBottom: height === 812 && Platform.OS === 'ios' ? 20 : 0,
  },
  empty: {
    height: 40,
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#f7f7f7',
    backgroundColor: 'transparent',
  },
  bucketlistRow: {
    flex: 1,
    margin: 20,
    opacity: 0,
  },
  toggleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  toggleText: {
    display: 'flex',
    fontSize: Platform.OS === 'ios' ? 14 : 20,
    paddingLeft: 10,
    paddingTop: 3,
    backgroundColor: 'transparent',
    color: '#f7f7f7',
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
    height: 20,
    transform: [{ scaleX }, { scaleY }],
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
