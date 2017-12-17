import {
  Platform,
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  input: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 3,
    flexBasis: '100%',
    marginTop: 2,
    padding: Platform.OS === 'ios' ? 15 : 5,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomColor: '#00bcd4',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 5,
    flexDirection: 'row',
    flexBasis: '45%',
    backgroundColor: '#00bcd4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  buttons: {
    flexBasis: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '20%',
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    color: '#00bcd4',
  },
  divider: {
    backgroundColor: '#00bcd4',
  },
});
