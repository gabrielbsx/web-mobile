import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  bgImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    color: '#419ED7',
  },
  description: {
    color: '#419ED7',
    fontSize: 32,
    textAlign: 'center',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    color: 'white',
    fontSize: 14,
  },
  formInput: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    fontSize: 18,
  },
  formButton: {
    width: 150,
  },
});
