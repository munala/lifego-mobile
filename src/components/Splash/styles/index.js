import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    height: 220,
    width: '200%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: '20%',
    textAlign: 'center',
    width: '100%',
    color: '#00bcd4',
    fontFamily: 'Chalkduster',
    fontSize: 50,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
