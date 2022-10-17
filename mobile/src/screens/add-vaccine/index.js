import React, {useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import iconCalendar from '../../assets/images/icon-calendar.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import vaccineProof from '../../assets/images/image-comprovante.png';
import {launchImageLibrary} from 'react-native-image-picker';
import AddVaccineController from '../../controllers/add-vaccine-controller';

function AddVaccine({navigation, vaccines, setVaccine}) {
  const [name, setName] = useState();
  const [dose, setDose] = useState();
  const [proof, setProof] = useState();
  const [date, setDate] = useState();
  const [nextDateDose, setNextDateDose] = useState();
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState();

  const onHandleUploadImage = async (setImage, image) => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const onHandleSubmit = async () => {
    try {
      setError('');
      const addVaccine = new AddVaccineController();
      addVaccine.setName(name);
      addVaccine.setDose(dose);
      addVaccine.setProof(proof);
      addVaccine.setDate(date);
      addVaccine.setNextDateDose(nextDateDose);
      const vaccine = await addVaccine.add();
      setVaccine([...vaccines, vaccine]);
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de vacinação</Text>
              <TouchableOpacity onPress={() => setPicker('date')}>
                <View style={styles.inputCalendar}>
                  <Text style={styles.labelCalendar}>
                    {date ? (
                      <Text>
                        {date.getDate().toString().padStart(2, '0')}/
                        {(date.getMonth() + 1).toString().padStart(2, '0')}/
                        {date.getFullYear()}
                      </Text>
                    ) : (
                      'dd/mm/aaaa'
                    )}
                  </Text>
                  <ImageBackground
                    style={styles.iconCalendar}
                    resizeMode="contain"
                    source={iconCalendar}
                  />
                </View>
              </TouchableOpacity>
              {picker === 'date' && (
                <DateTimePicker
                  disabled={!picker}
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, _date) => {
                    setDate(_date);
                    setPicker(false);
                  }}
                  onTouchCancel={() => setPicker(false)}
                  onConfirm={() => setPicker(false)}
                />
              )}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vacina</Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                placeholderTextColor="#3F92C5"
                placeholder="Hepatite B"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.labelRadio}>Dose</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  onPress={() => setDose('1ª dose')}
                  style={styles.radioInputGroup}>
                  <View
                    style={
                      dose === '1ª dose'
                        ? styles.radioInputChecked
                        : styles.radioInput
                    }
                  />
                  <Text style={styles.radioLabel}>1ª dose</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDose('2ª dose')}
                  style={styles.radioInputGroup}>
                  <View
                    style={
                      dose === '2ª dose'
                        ? styles.radioInputChecked
                        : styles.radioInput
                    }
                  />
                  <Text style={styles.radioLabel}>2ª dose</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDose('3ª dose')}
                  style={styles.radioInputGroup}>
                  <View
                    style={
                      dose === '3ª dose'
                        ? styles.radioInputChecked
                        : styles.radioInput
                    }
                  />
                  <Text style={styles.radioLabel}>3ª dose</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDose('Dose única')}
                  style={styles.radioInputGroup}>
                  <View
                    style={
                      dose === 'Dose única'
                        ? styles.radioInputChecked
                        : styles.radioInput
                    }
                  />
                  <Text style={styles.radioLabel}>Dose única</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.labelProof}>Comprovante</Text>
              <View style={styles.proof}>
                <View style={styles.proofButton}>
                  <Button
                    onPress={() => onHandleUploadImage(setProof, proof)}
                    title="Selecionar imagem..."
                    color="#419ED7"
                  />
                </View>
                {/* <Image */}
                <ImageBackground
                  style={proof ? styles.proofImage : null}
                  resizeMode="cover"
                  // resizeMethod="resize"
                  source={{uri: proof}}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Próxima vacinação</Text>
              <TouchableOpacity onPress={() => setPicker('nextDose')}>
                <View style={styles.inputCalendar}>
                  <Text style={styles.labelCalendar}>
                    {nextDateDose ? (
                      <Text>
                        {nextDateDose.getDate().toString().padStart(2, '0')}/
                        {(nextDateDose.getMonth() + 1)
                          .toString()
                          .padStart(2, '0')}
                        /{nextDateDose.getFullYear()}
                      </Text>
                    ) : (
                      'dd/mm/aaaa'
                    )}
                  </Text>
                  <ImageBackground
                    style={styles.iconCalendar}
                    resizeMode="contain"
                    source={iconCalendar}
                  />
                </View>
              </TouchableOpacity>
              {picker === 'nextDose' && (
                <DateTimePicker
                  disabled={!picker}
                  value={nextDateDose || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, _date) => {
                    setNextDateDose(_date);
                    setPicker(false);
                  }}
                  onTouchCancel={() => setPicker(false)}
                  onConfirm={() => setPicker(false)}
                />
              )}
            </View>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View style={styles.containerButton}>
          <Button onPress={onHandleSubmit} title="Cadastrar" color="#49B976" />
        </View>
      </View>
    </ScrollView>
  );
}

export default AddVaccine;
