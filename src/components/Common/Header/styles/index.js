/* eslint-disable no-nested-ternary */
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  headerStyle: {
    width,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? (height === 812 ? 98 : 64) : 48,
    paddingTop: Platform.OS === 'ios' ? (height === 812 ? 50 : 20) : 0,
    zIndex: 10,
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
    backgroundColor: '#f7f7f7',
    color: 'grey',
    fontSize: 14,
  },
  titleText: {
    display: 'flex',
    flexBasis: '75%',
    color: '#00bcd4',
    fontSize: 20,
    paddingHorizontal: 10,
    textAlign: Platform.OS === 'android' ? 'left' : 'center',
  },
});
