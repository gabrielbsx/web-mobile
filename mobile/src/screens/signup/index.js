import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  Button,
} from 'react-native';
import iconVaccine from '../../assets/images/icon-vaccine.png';
import styles from './styles';

function SignUp({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => navigation.navigate('SignIn')}>
        <ImageBackground
          style={styles.logo}
          resizeMode="contain"
          source={iconVaccine}
        />
        <Text style={styles.logoText}>MyHealth</Text>
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#3F92C5"
              placeholder="Jurandir Pereira"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sexo</Text>
            <TouchableOpacity style={styles.gender}>
              <Text style={styles.genderText}>Masculino</Text>
              <Text style={styles.genderText}>Feminino</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nascimento</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#3F92C5"
              placeholder="jurandir.pereira@hotmail.com"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholderTextColor="#3F92C5"
              placeholder="********"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Repetir senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholderTextColor="#3F92C5"
              placeholder="****"
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Cadastrar" color="#3F92C5" />
        </View>
      </View>
    </View>
  );
}

export default SignUp;
