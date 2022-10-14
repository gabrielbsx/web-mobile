import React from 'react';
import {
  Button,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import backgroundImage from '../../assets/images/vaccine-background.jpeg';
import iconVaccine from '../../assets/images/icon-vaccine.png';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

function SignIn({navigation}) {
  return (
    <View>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={backgroundImage}
      />
      <LinearGradient
        colors={[
          'rgba(84, 131, 126, 0.2)',
          'rgba(255, 255, 255, 0.62)',
          'rgba(221, 230, 229, 0.68)',
          'rgba(59, 94, 90, 0.51)',
        ]}
        style={styles.linearBackground}
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.logoContainer}>
          <ImageBackground
            style={styles.logo}
            resizeMode="contain"
            source={iconVaccine}
          />
          <Text style={styles.logoText}>MyHealth</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.description}>
            Controle as suas vacinas e fique seguro
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>E-mail</Text>
            <TextInput
              placeholder="jurandir.pereira@hotmail.com"
              placeholderTextColor="#3F92C5"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>E-mail</Text>
            <TextInput
              type="password"
              placeholder="***********"
              placeholderTextColor="#3F92C5"
              style={styles.formInput}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.formButtonGroup}>
            <View style={styles.formButtonEnter}>
              <Button
                title="Entrar"
                color="#49B976"
                style={styles.formButtonEnter}
                onPress={() => {
                  console.log('hello there!');
                }}
              />
            </View>
          </View>
          <View style={styles.formButtonGroup}>
            <View style={styles.formButtonCreate}>
              <Button
                title="Criar minha conta"
                color="#419ED7"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
          <View style={styles.formButtonGroup}>
            <View style={styles.formButtonForget}>
              <Button
                title="Esqueci minha senha"
                color="#B5C7D1"
                onPress={() => navigation.navigate('ForgetPassword')}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignIn;
