import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#ADD4D0',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1E7E3',
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'averia-libre',
    color: '#419ED7',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 3,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 10,
    flex: 2,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    display: 'flex',
    fontSize: 17,
    color: 'white',
    width: 120,
    fontFamily: 'averia-libre',
    textAlign: 'right',
    marginRight: 10,
  },
  input: {
    display: 'flex',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontFamily: 'averia-libre',
    fontSize: 18,
    width: 240,
    height: 40,
    color: '#3F92C5',
  },
  gender: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 240,
  },
  genderText: {
    color: 'white',
    fontSize: 18,
  },
  buttonGroup: {
    display: 'flex',
    flex: 1,
  },
});
