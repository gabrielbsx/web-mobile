import FormValidation from './form-validation';
import {db, auth} from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import {addDoc, collection, runTransaction} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class SignUpController extends FormValidation {
  name;
  gender;
  born;
  email;
  password;
  passwordConfirmation;

  constructor() {
    super();
    this.setParamsTranslate({
      name: 'Nome',
      gender: 'Sexo',
      born: 'Data de nascimento',
      email: 'Email',
      password: 'Senha',
      passwordConfirmation: 'Confirmação de senha',
    });
    this.setRequiredFields([
      'name',
      'gender',
      'password',
      'passwordConfirmation',
      'born',
      'email',
    ]);
  }

  setName(name) {
    this.name = name;
  }

  setGender(gender) {
    this.gender = gender;
  }

  setBorn(born) {
    this.born = born;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setPasswordConfirmation(passwordConfirmation) {
    this.passwordConfirmation = passwordConfirmation;
  }

  validateOrThrow() {
    return this.validateFields(this);
  }

  handle = async () => {
    const userAuthenticate = await createUserWithEmailAndPassword(
      auth,
      this.email,
      this.password,
    );
    updateProfile(userAuthenticate.user, {
      displayName: this.name,
    });
    return userAuthenticate;
  };
}
