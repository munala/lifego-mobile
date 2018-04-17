import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(127,127,127,0.8)',
    height: '100%',
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginBottom: 50,
  },
  image: {
    opacity: 0.5,
    backgroundColor: '#aaa',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    paddingBottom: '10%',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    elevation: 10,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
