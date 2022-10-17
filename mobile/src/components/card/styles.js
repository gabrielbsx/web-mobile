import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    width: 190,
  },
  cardName: {
    fontSize: 24,
    fontFamily: 'averia-libre',
    color: '#3F92C5',
    alignSelf: 'center',
  },
  cardDose: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: 'averia-libre',
    color: 'white',
    alignSelf: 'center',
    backgroundColor: '#3F92C5',
    paddingHorizontal: 10,
  },
  cardDate: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: 'averia-libre',
    alignSelf: 'center',
    color: '#8B8B8B',
    marginTop: 5,
  },
  cardProof: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    minHeight: 80,
  },
  cardImageProof: {
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
});
