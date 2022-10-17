import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import iconCalendar from '../../assets/images/icon-calendar.png';
import styles from './styles';
import HeaderGuest from '../../components/header-guest';
import {SignUpController} from '../../controllers/signup-controller';

function SignUp({navigation, setUser}) {
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [born, setBorn] = useState(new Date());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState('');

  const onHandleSubmit = async () => {
    const signUpController = new SignUpController();
    signUpController.setName(name);
    signUpController.setGender(gender);
    signUpController.setBorn(born);
    signUpController.setEmail(email);
    signUpController.setPassword(password);
    signUpController.setPasswordConfirmation(passwordConfirmation);
    try {
      setError('');
      signUpController.validateOrThrow();
      const {user} = await signUpController.handle();
      setUser(user);
    } catch (e) {
      setError(
        e.message.includes('Firebase')
          ? 'Ocorreu um erro ao criar sua conta.'
          : e.message,
      );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setName();
      setGender();
      setBorn(new Date());
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setPicker(false);
      setError();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderGuest navigation={navigation} />
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                placeholderTextColor="#3F92C5"
                placeholder="Jurandir Pereira"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sexo</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  onPress={() => setGender('masculino')}
                  style={styles.radioInputGroup}>
                  <View
                    style={
                      gender === 'masculino'
                        ? styles.radioInputChecked
                        : styles.radioInput
                    }
                  />
                  <Text style={styles.radioLabel}>Masculino</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('feminino')}
                  style={styles.radioInputGroup}>
                  <View
                    style={
                      gender === 'feminino'
                        ? styles.radioInputChecked
                        : styles.radioInput
                    }
                  />
                  <Text style={styles.radioLabel}>Feminino</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data nascimento</Text>
              <TouchableOpacity onPress={() => setPicker(true)}>
                <View style={styles.inputCalendar}>
                  <Text style={styles.labelCalendar}>
                    {born.getDate().toString().padStart(2, '0')}/
                    {(born.getMonth() + 1).toString().padStart(2, '0')}/
                    {born.getFullYear()}
                  </Text>
                  <ImageBackground
                    style={styles.iconCalendar}
                    resizeMode="contain"
                    source={iconCalendar}
                  />
                </View>
              </TouchableOpacity>
              {picker && (
                <DateTimePicker
                  disabled={!picker}
                  value={born}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setBorn(date);
                    setPicker(false);
                  }}
                  onTouchCancel={() => setPicker(false)}
                  onConfirm={() => setPicker(false)}
                />
              )}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.input}
                placeholderTextColor="#3F92C5"
                placeholder="jurandir.pereira@hotmail.com"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor="#3F92C5"
                placeholder="********"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Repetir senha</Text>
              <TextInput
                value={passwordConfirmation}
                onChangeText={text => setPasswordConfirmation(text)}
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor="#3F92C5"
                placeholder="****"
              />
            </View>
            {error && (
              <View style={styles.errorGroup}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
          <View style={styles.buttonGroup}>
            <Button
              onPress={onHandleSubmit}
              title="Cadastrar"
              color="#37BD6D"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUp;
