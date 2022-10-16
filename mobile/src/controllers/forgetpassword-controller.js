import FormValidation from './form-validation';

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
}
