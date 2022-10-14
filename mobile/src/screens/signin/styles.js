import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  bgImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.15,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  linearBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('window').height,
    marginHorizontal: 30,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flex: 2,
  },
  logo: {
    width: 65,
    height: 65,
  },
  logoText: {
    fontSize: 48,
    color: '#419ED7',
    textDecorationLine: 'underline',
    fontFamily: 'averia-libre',
  },
  description: {
    color: '#419ED7',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'averia-libre',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  formButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
    justifyContent: 'center',
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    color: 'white',
    fontSize: 14,
    fontFamily: 'averia-libre',
  },
  formInput: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: '#3F92C5',
    placeholderTextColor: '#3F92C5',
    width: Dimensions.get('window').width - 100,
  },
  formButtonEnter: {
    width: 110,
  },
  formButtonCreate: {
    width: 190,
  },
  formButtonForget: {
    width: 200,
  },
});
