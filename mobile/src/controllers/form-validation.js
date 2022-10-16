export default class FormValidation {
  fields = {};
  requiredFields = [];
  paramsTranslate = {};

  constructor() {}

  setRequiredFields(requiredFields) {
    this.requiredFields = requiredFields;
  }

  setParamsTranslate(paramsTranslate) {
    this.paramsTranslate = paramsTranslate;
  }

  validateFields(fields) {
    for (const field of this.requiredFields) {
      if (!fields[field]) {
        throw new Error(`${this.paramsTranslate[field]} é obrigatório`);
      }
      if (field === 'password') {
        if (fields[field].length < 6) {
          throw new Error('Senha deve conter no mínimo 6 caracteres');
        }
      }
      if (field === 'name') {
        if (fields[field].length < 3) {
          throw new Error('Nome deve conter no mínimo 3 caracteres');
        }
      }
      if (field === 'email') {
        if (fields[field].match(/.+@.+\..+/) === null) {
          throw new Error('Email inválido');
        }
      }
      if (field === 'passwordConfirmation') {
        if (fields[field] !== fields.password) {
          throw new Error('Confirmação de senha e senha não conferem');
        }
      }
    }
    return true;
  }
}
