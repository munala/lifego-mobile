import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  iconStyle: {
    display: 'flex',
    marginRight: 5,
  },
  dropdownStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 5,
    width: 100,
  },
  dropdownTextStyle: {
    display: 'flex',
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    width: 100,
    paddingLeft: 10,
    height: 40,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    width: 100,
    paddingLeft: 10,
    height: 40,
  },
  anchorStyle: {
    right: 10,
    top: 0,
    position: 'absolute',
  },
  menu: {
    top: 0,
    right: 10,
    position: 'absolute',
  },
});
