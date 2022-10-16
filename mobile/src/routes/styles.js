import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  drawer: {
    marginHorizontal: 30,
    marginTop: 50,
  },
  labelUsername: {
    marginBottom: 40,
  },
  username: {
    fontSize: 24,
    fontFamily: 'averia-libre',
    color: '#419ED7',
    textAlign: 'center',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#419ED7',
  },
  drawerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    fontSize: 18,
    fontFamily: 'averia-libre',
    color: '#419ED7',
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
