import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#ADD4D0',
    flex: 1,
    padding: 5,
    minWidth: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height - 45,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    display: 'flex',
    fontSize: 16,
    color: 'white',
    width: 140,
    fontFamily: 'averia-libre',
    textAlign: 'right',
    marginRight: 10,
  },
  input: {
    display: 'flex',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontFamily: 'averia-libre',
    fontSize: 16,
    width: 235,
    height: 40,
    color: '#3F92C5',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: 235,
    flexWrap: 'wrap',
  },
  labelRadio: {
    display: 'flex',
    fontSize: 16,
    color: 'white',
    width: 140,
    fontFamily: 'averia-libre',
    textAlign: 'right',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  radioLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  radioInput: {
    display: 'flex',
    backgroundColor: 'white',
    width: 20,
    height: 20,
    color: '#3F92C5',
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  radioInputChecked: {
    display: 'flex',
    backgroundColor: '#419ED7',
    width: 20,
    height: 20,
    color: '#3F92C5',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
    marginBottom: 10,
  },
  radioInputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconCalendar: {
    display: 'flex',
    width: 24,
    height: 24,
  },
  inputCalendar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: 'averia-libre',
    backgroundColor: 'white',
    borderWidth: 0,
    width: 180,
  },
  labelCalendar: {
    display: 'flex',
    fontSize: 16,
    color: '#3F92C5',
    fontFamily: 'averia-libre',
  },
  containerButton: {
    display: 'flex',
    width: 170,
    alignSelf: 'center',
    justifyContent: 'space-around',
    flex: 2,
  },
  labelProof: {
    display: 'flex',
    fontSize: 16,
    color: 'white',
    width: 140,
    fontFamily: 'averia-libre',
    textAlign: 'right',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  proof: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 140,
  },
  proofButton: {
    display: 'flex',
    width: 200,
  },
  proofImage: {
    display: 'flex',
    marginTop: 10,
    flex: 1,
    minHeight: 110,
  },
  error: {
    display: 'flex',
    color: 'red',
  },
  cancelButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FD7979',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    width: 100,
    shadowColor: '#000',
  },
  cancelText: {
    fontFamily: 'averia-libre',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    color: 'white',
  },
  trashIcon: {
    display: 'flex',
    width: 24,
    height: 24,
  },
  marginButton: {
    // paddingBottom: 60,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: '#B9DFDB',
    width: 300,
  },
  modalTitle: {
    textAlign: 'center',
  },
  modalInfo: {
    fontFamily: 'averia-libre',
    fontSize: 18,
    color: '#FD7979',
    textAlign: 'center',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  modalYes: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FF8383',
    width: '50%',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  modalCancel: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#3F92C5',
    width: '50%',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  modalYesText: {
    fontFamily: 'averia-libre',
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
  modalCancelText: {
    fontFamily: 'averia-libre',
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
});