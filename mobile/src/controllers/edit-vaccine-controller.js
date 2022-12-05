import {updateDoc, collection, doc} from 'firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';
import {auth, db, storage} from '../services/firebase';

export default class EditVaccineController {
  id;
  name;
  dose;
  proof;
  proofOld;
  nextDateDose;
  pathProof;
  date;
  latitude;
  longitude;

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

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setPathProof(pathProof) {
    this.pathProof = pathProof;
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

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
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

    if (this.proof.includes('firebasestorage')) {
      console.log('yup');
    }

    const image = await fetch(this.proof);
    const blob = await image.blob();

    await uploadBytes(ref(storage, this.pathProof), blob);

    const vaccine = {
      name: this.name,
      dose: this.dose,
      proof: this.proof,
      nextDateDose: this.nextDateDose,
      date: this.date,
      pathProof: this.pathProof,
      latitude: this.latitude,
      longitude: this.longitude,
    };

    try {
      const vaccineUpdated = updateDoc(doc(db, 'vaccines', this.id), vaccine);
      return vaccineUpdated;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
