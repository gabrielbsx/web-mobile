import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderGuest from '../../components/header-guest';
import ForgetPasswordController from '../../controllers/forgetpassword-controller';
import styles from './styles';

function ForgetPassword({navigation}) {
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const onHandleSubmit = () => {
    const forgetPasswordController = new ForgetPasswordController();
    forgetPasswordController.setEmail(email);

    try {
      forgetPasswordController.validateOrThrow();
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderGuest navigation={navigation} />
        <View style={styles.formGroup}>
          <View style={styles.formInput}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                onChangeText={text => setEmail(text)}
                style={styles.input}
                placeholderTextColor="#3F92C5"
                placeholder="jurandir.pereira@hotmail.com"
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
              title="Recuperar senha"
              color="#37BD6D"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ForgetPassword;
