import FormValidation from './form-validation';
import {auth} from '../services/firebase';
import {sendPasswordResetEmail} from 'firebase/auth';

export default class ForgetPasswordController extends FormValidation {
  email;

  constructor() {
    super();
    this.setParamsTranslate({
      email: 'Email',
    });
    this.setRequiredFields(['email']);
  }

  setEmail(email) {
    this.email = email;
  }

  validateOrThrow() {
    this.validateFields(this);
  }

  async recovery() {
    try {
      await sendPasswordResetEmail(auth, this.email);
      // sendPasswordResetEmail(auth, this.email)
      //   .then(() => {
      //     console.log(
      //       'Email de redefinição enviado com sucesso para ' + this.email,
      //     );
      //   })
      //   .catch(() => {
      //     console.log('Erro ao solicitar a redefinição de senha');
      //   });
      console.log(
        'Email de redefinição enviado com sucesso para ' + this.email,
      );
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
