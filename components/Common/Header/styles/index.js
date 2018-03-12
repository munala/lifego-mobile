import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  headerStyle: {
    width,
    backgroundColor: '#00bcd4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? (height === 812 ? 98 : 64) : 48,
    paddingTop: Platform.OS === 'ios' ? (height === 812 ? 50 : 20) : 0,
  },
  iconLeftStyle: {
    display: 'flex',
    marginLeft: 5,
  },
  iconRightStyle: {
    display: 'flex',
    marginRight: 5,
  },
  search: {
    display: 'flex',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flexBasis: '85%',
  },
  searchInput: {
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#fff',
    fontSize: 16,
  },
  titleText: {
    display: 'flex',
    flexBasis: '75%',
    color: '#fff',
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: Platform.OS === 'android' ? 'left' : 'center',
  },
});
