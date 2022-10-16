import FormValidation from './form-validation';
import {app, auth, db} from '../services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SignInController extends FormValidation {
  email;
  password;

  constructor() {
    super();
    this.setParamsTranslate({
      email: 'Email',
      password: 'Senha',
    });
    this.setRequiredFields(['email', 'password']);
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  validateOrThrow() {
    return this.validateFields(this);
  }

  async handle() {
    const userAuthenticate = await signInWithEmailAndPassword(
      auth,
      this.email,
      this.password,
    );
    AsyncStorage.setItem('user', JSON.stringify(userAuthenticate.user));
    return userAuthenticate;
  }
}
