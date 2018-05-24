import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    borderRadius: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingVertical: -1,
    overflow: 'hidden',
  },
  label: {
    fontSize: 16,
    color: 'grey',
    display: 'flex',
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
