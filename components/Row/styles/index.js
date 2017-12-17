import { StyleSheet } from 'react-native';

export default { localStyles: StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255,1)',
    borderWidth: 0,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  swipeout: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#00bcd4',
  },
  divider: {
    backgroundColor: '#00bcd4',
  },
  label: {
    padding: 5,
    color: '#00bcd4',
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    padding: 5,
    color: '#00bcd4',
    fontSize: 16,
  },
  drag: {
    flexBasis: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 7,
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    lineHeight: 5,
    color: '#00bcd4',
    fontWeight: '600',
  },
  modal: {
    backgroundColor: 'transparent',
    marginTop: 50,
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  detailRow: {
    flexBasis: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: '20%',
    marginTop: 5,
    marginBottom: 5,
  },
  property: {
    borderRadius: 5,
    flexDirection: 'row',
    flexBasis: '80%',
    fontWeight: '600',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 5,
  },
  propertyValue: {
    flexBasis: '80%',
  },
  button: {
    marginTop: 5,
    borderRadius: 5,
    flexDirection: 'row',
    flexBasis: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#666',
  },
  handleTouch: {
    backgroundColor: 'transparent',
  },
  done: { width: 50, height: 50, flexBasis: '15%' },
}),
baseStyles: StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  doneButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#aaaaaa',
    paddingTop: 10,
  },
}),
};