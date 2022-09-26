import React from 'react';
import {Button, ImageBackground, Text, TextInput, View} from 'react-native';
import backgroundImage from '../../assets/images/vaccine-background.jpeg';
import styles from './styles';

function SignIn() {
  return (
    <ImageBackground
      style={styles.bgImage}
      resizeMode="cover"
      source={backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MyHealth</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.description}>
            Controle as suas vacinas e fique seguro
          </Text>
        </View>
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>E-mail</Text>
            <TextInput
              placeholder="jurandir.pereira@hotmail.com"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>E-mail</Text>
            <TextInput
              type="password"
              placeholder="***********"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formButton}>
              <Button
                title="Entrar"
                color="#49B976"
                onPress={() => {
                  console.log('hello there!');
                }}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formButton}>
              <Button
                title="Entrar"
                color="#49B976"
                onPress={() => {
                  console.log('hello there!');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default SignIn;
