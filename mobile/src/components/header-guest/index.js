import React from 'react';
import {TouchableOpacity, ImageBackground, Text} from 'react-native';
import styles from './styles';
import iconVaccine from '../../assets/images/icon-vaccine.png';

function HeaderGuest({navigation}) {
  return (
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
  );
}

export default HeaderGuest;
