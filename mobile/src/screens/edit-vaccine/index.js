import React, {useEffect, useState} from 'react';
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
import TrashIcon from '../../assets/images/trash.png';
import EditVaccineController from '../../controllers/edit-vaccine-controller';
import {collection, deleteDoc, doc, getDoc} from 'firebase/firestore';
import {db, storage} from '../../services/firebase';
import {deleteObject, ref} from 'firebase/storage';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';

function EditVaccine({route, navigation}) {
  const [name, setName] = useState();
  const [dose, setDose] = useState();
  const [proof, setProof] = useState();
  const [date, setDate] = useState();
  const [nextDateDose, setNextDateDose] = useState();
  const [pathProof, setPathProof] = useState();
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState();
  const [vaccineId, setVaccineId] = useState();
  const [modal, setModal] = useState(false);
  const [map, setMap] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const stateVaccineId = useSelector(state => state.vaccine.id);

  console.log(new Date());

  useEffect(() => {
    const vaccineIdSendedByRoute = stateVaccineId;
    getDoc(doc(db, 'vaccines', vaccineIdSendedByRoute))
      .then(result => {
        const vaccineData = result.data();
        if (!vaccineData) {
          return;
        }
        const vaccine = {
          ...vaccineData,
          id: result.id,
          date: vaccineData.date?.toDate(),
          nextDateDose: vaccineData.nextDateDose?.toDate(),
        };
        if (!vaccineIdSendedByRoute) {
          navigation.navigate('Home');
          return;
        }

        setVaccineId(result.id);

        if (!vaccine) {
          navigation.navigate('Home');
          return;
        }

        setName(vaccine.name);
        setDose(vaccine.dose);
        setProof(vaccine.proof);
        setPathProof(vaccine.pathProof);
        setDate(vaccine.date);
        setNextDateDose(vaccine.nextDateDose);
        setLatitude(vaccine.latitude || 0);
        setLongitude(vaccine.longitude || 0);
      })
      .catch(error => {
        console.error(error);
        navigation.navigate('Home');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, stateVaccineId, route]);

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

  const onHandleDelete = async () => {
    setModal(false);
    try {
      deleteObject(ref(storage, pathProof));
      await deleteDoc(doc(db, 'vaccines', vaccineId));
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleMap = event => {
    setLatitude(event.nativeEvent.coordinate.latitude);
    setLongitude(event.nativeEvent.coordinate.longitude);
  };

  const onHandleSubmit = async () => {
    try {
      setError('');
      const editVaccine = new EditVaccineController();
      editVaccine.setId(vaccineId);
      editVaccine.setName(name);
      editVaccine.setDose(dose);
      editVaccine.setProof(proof);
      editVaccine.setPathProof(pathProof);
      editVaccine.setDate(date);
      editVaccine.setNextDateDose(nextDateDose);
      editVaccine.setLatitude(latitude);
      editVaccine.setLongitude(longitude);
      await editVaccine.edit();
      navigation.navigate('Home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ScrollView>
      {modal && (
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalInfo}>
                Tem certeza que deseja remover essa vacina?
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalYes}
                onPress={onHandleDelete}>
                <Text style={styles.modalYesText}>SIM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModal(false)}>
                <Text style={styles.modalCancelText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
                onChangeText={text => setName(text)}
                value={name}
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
            <View style={{padding: 10, marginBottom: -20}}>
              <Button
                onPress={() => setMap(!map)}
                title={!map ? 'Abrir Mapa' : 'Fechar Mapa'}
                color="#419ED7"
              />
              {map && (
                <MapView
                  onPress={event => onHandleMap(event)}
                  loadingEnabled={true}
                  region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  style={{height: 180, marginTop: 10, borderRadius: 100}}>
                  <Marker
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    pinColor="#49B976"
                    title="Localização"
                    description="Localização da vacinação"
                  />
                </MapView>
              )}
            </View>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View style={styles.containerButton}>
          <View style={styles.marginButton}>
            <Button
              onPress={onHandleSubmit}
              title="Salvar Alterações"
              color="#49B976"
            />
          </View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModal(true)}>
            <ImageBackground style={styles.trashIcon} source={TrashIcon} />
            <Text style={styles.cancelText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditVaccine;
