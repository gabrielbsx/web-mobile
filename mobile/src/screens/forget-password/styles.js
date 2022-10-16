import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    minWidth: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#ADD4D0',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height - 60,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    marginVertical: 10,
  },
  formInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '50%',
  },
  label: {
    display: 'flex',
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    fontFamily: 'averia-libre',
    marginRight: 10,
  },
  input: {
    display: 'flex',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontFamily: 'averia-libre',
    fontSize: 16,
    width: 240,
    height: 40,
    color: '#3F92C5',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  errorGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#FD7979',
  },
});
