import {addDoc, collection, runTransaction} from 'firebase/firestore';
import {auth, db} from '../services/firebase';

export default class EditVaccineController {
  name;
  dose;
  proof;
  nextDateDose;
  date;

  requiredFields = [];
  fieldsTranslate = [];

  constructor() {
    //this.requiredFields = ['name', 'dose', 'proof', 'date', 'nextDateDose'];
    this.fieldsTranslate = {
      name: 'Nome',
      dose: 'Dose',
      proof: 'Comprovante',
      date: 'Data',
      nextDateDose: 'Próxima dose',
    };
  }

  setName(name) {
    this.name = name;
  }

  setDose(dose) {
    this.dose = dose;
  }

  setProof(proof) {
    this.proof = proof;
  }

  setNextDateDose(nextDateDose) {
    this.nextDateDose = nextDateDose;
  }

  setDate(date) {
    this.date = date;
  }

  async edit() {
    if (this.dose === 'Dose única') {
      this.nextDateDose = null;
      this.requiredFields.splice(
        this.requiredFields.indexOf('nextDateDose'),
        1,
      );
    } else if (!this.requiredFields.includes('nextDateDose')) {
      this.requiredFields.push('nextDateDose');
    }

    for (const field of this.requiredFields) {
      if (!this[field]) {
        throw new Error(`O campo ${this.fieldsTranslate[field]} é obrigatório`);
      }
    }

    const userAuthenticate = auth.currentUser;

    if (!userAuthenticate) {
      throw new Error('Usuário não autenticado');
    }

    const vaccine = {
      name: this.name,
      dose: this.dose,
      proof: this.proof,
      nextDateDose: this.nextDateDose,
      date: this.date,
    };

    return vaccine;
  }
}
