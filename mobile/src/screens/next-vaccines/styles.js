import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ADD4D0',
    flex: 1,
    padding: 5,
  },
  list: {
    display: 'flex',
    flex: 1,
  },
  nextDateDose: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    fontFamily: 'averia-libre',
    alignSelf: 'flex-end',
    color: '#FD7979',
  },
  containerButton: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#3F92C5',
    width: 140,
    alignSelf: 'center',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
