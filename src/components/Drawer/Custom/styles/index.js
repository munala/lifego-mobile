import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  copyright: {
    display: 'flex',
    fontSize: 14,
    color: 'grey',
    textAlign: 'left',
    height: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  account: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(127,127,127,0.8)',
  },
  image: {
    opacity: 0.5,
    backgroundColor: '#aaa',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  profilePic: {
    marginTop: height === 812 && Platform.OS === 'ios' ? 60 : 20,
    marginLeft: 20,
    display: 'flex',
    height: 70,
    width: 70,
    borderRadius: 35,
    overflow: 'hidden',
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#f7f7f7',
  },
  toggle: {
    display: 'flex',
    margin: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  all: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  displayName: {
    display: 'flex',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    display: 'flex',
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    display: 'flex',
  },
  logout: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logoutText: {
    display: 'flex',
    fontSize: 16,
    color: '#fff',
  },
  route: {
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  routeName: {
    display: 'flex',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 20,
  },
  active: {
    color: '#00bcd4',
  },
  activeBackground: {
    backgroundColor: '#f7f7f7',
  },
});
