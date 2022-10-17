import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  cardName: {
    fontSize: 24,
    fontFamily: 'averia-libre',
    color: '#3F92C5',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  nextDateDose: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    fontFamily: 'averia-libre',
    alignSelf: 'flex-start',
    color: '#8B8B8B',
  },
});
