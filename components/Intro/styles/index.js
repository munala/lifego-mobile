import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginBottom: 50,
  },
  image: {
    opacity: 0.1,
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginBottom: 100,
  },
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingBottom: '10%',
  },
  text: {
    color: 'grey',
    fontSize: 26,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  icon: {
    elevation: 10,
    marginBottom: 50,
  },
  title: {
    color: 'grey',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25,
  },
});
