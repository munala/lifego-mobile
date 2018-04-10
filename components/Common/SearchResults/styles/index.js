import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderTopWidth: 0,
    marginTop: 0,
  },
  resultContainerStyle: {
    display: 'flex',
    marginVertical: 1,
    borderBottomColor: '#f7f7f7',
  },
  resultWrapperStyle: {
    width: '100%',
  },
  title: {
    color: '#00bcd4',
    fontSize: 14,
  },
  personTitle: {
    color: 'grey',
    fontSize: 14,
  },
  subtitle: {
    color: 'grey',
    fontSize: 12,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#fff',
  },
  option: {
    display: 'flex',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  optionText: {
    display: 'flex',
    fontSize: 12,
    fontWeight: 'bold',
  },
  personAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 70,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00bcd4',
    marginRight: 10,
  },
  removeAction: {
    backgroundColor: '#00bcd4',
  },
  actionText: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 12,
    color: '#00bcd4',
    fontWeight: 'bold',
  },
  removeActionText: {
    color: '#fff',
  },
});
