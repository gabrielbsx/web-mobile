import {addDoc, collection, runTransaction} from 'firebase/firestore';
import {auth, db} from '../services/firebase';

export default class AddVaccineController {
  name;
  dose;
  proof;
  nextDateDose;
  date;

  requiredFields = [];
  fieldsTranslate = [];

  constructor() {
    this.requiredFields = ['name', 'dose', 'proof', 'date', 'nextDateDose'];
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

  async add() {
    for (const field of this.requiredFields) {
      if (!this[field]) {
        throw new Error(`O campo ${this.fieldsTranslate[field]} é obrigatório`);
      }
    }

    const userAuthenticate = auth.currentUser;

    if (!userAuthenticate) {
      throw new Error('Usuário não autenticado');
    }

    const idRandomByTimestamp =
      Date.now().toString(36) + Math.random().toString(36);

    const vaccine = {
      id: idRandomByTimestamp,
      name: this.name,
      dose: this.dose,
      proof: this.proof,
      nextDateDose: this.nextDateDose,
      date: this.date,
      userId: userAuthenticate.uid,
    };
    // await runTransaction(db, async transaction => {
    //   const vaccineRef = await addDoc(collection(db, 'vaccines'), vaccine);
    //   const userRef = collection(db, 'users').doc(userAuthenticate.uid);
    //   const userDoc = await transaction.get(userRef);
    //   const vaccines = userDoc.data().vaccines || [];
    //   vaccines.push(vaccineRef.id);
    //   transaction.update(userRef, {vaccines});
    // });

    return vaccine;
  }
}
